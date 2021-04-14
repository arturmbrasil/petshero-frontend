import React, {
  useCallback,
  useEffect,
  useState,
  useRef,
  ChangeEvent,
  useMemo,
} from 'react';
import {
  FiMail,
  FiLock,
  FiUser,
  FiCamera,
  FiArrowLeft,
  FiPhone,
  FiDollarSign,
} from 'react-icons/fi';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { useHistory, Link } from 'react-router-dom';

import { MenuItem, Select } from '@material-ui/core';
import { Container, Content, AvatarInput } from './styles';
import NavBar from '../../components/NavBar';

import Header from '../../components/Header';
import Input from '../../components/Input';
import Button from '../../components/Button';

import api from '../../services/api';

import { useToast } from '../../hooks/toast';
import getValidationErrors from '../../utils/getValidationErrors';
import { useAuth } from '../../hooks/auth';
import logoImg from '../../assets/logo.png';

interface FormData {
  title: string;
  description: string;
  target_value: string;
  received_value: string;
  animal_id: string;
}

interface Animal {
  id: string;
  name: string;
  age: string;
  gender: string;
  size: string;
  species: string;
  breed: string;
  description: string;
  adopted: boolean;
  avatar_url: string | null;
  ong: { name: string };
}

const NovaCampanha: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const [animal, setAnimal] = React.useState('0');
  const [listaAnimais, setListaAnimais] = useState<Animal[]>([]);

  const { user, updateUser } = useAuth();

  const handleSubmit = useCallback(
    async (data: FormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          title: Yup.string().required('Título obrigatório'),
          description: Yup.string().required('Descrição obrigatória'),
          target_value: Yup.string().required(
            'Meta de arrecadação obrigatória',
          ),
          received_value: Yup.string().required('Valor arrecadado obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const { title, description, target_value, received_value } = data;

        const formData = {
          title,
          description,
          target_value,
          received_value,
          animal_id: animal !== '0' ? animal : null,
        };

        const response = await api.post('/campaigns', formData);

        if (response.data.id)
          history.push(`/minhas-campanhas/editar/${response.data.id}`);

        addToast({
          type: 'success',
          title: 'Campanha cadastrada!',
          description: 'Sua campanha foi cadastrada com sucesso!',
        });
        addToast({
          type: 'info',
          title: 'Experimente cadastrar uma foto!',
          description:
            'Cadastrar uma foto na sua campanha vai ajudar a arrecadar mais!',
        });
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro',
          description:
            'Ocorreu um erro ao cadastrar a campanha, tente novamente',
        });
      }
    },
    [addToast, animal, history],
  );

  const handleChangeAnimal = useCallback((event) => {
    setAnimal(event.target.value);
  }, []);

  useEffect(() => {
    api
      .get(`/ongs/animals`, { params: { ong_id: user.id } })
      .then((response) => {
        setListaAnimais(response.data);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const handleAvatarChange = useCallback(
  //   (e: ChangeEvent<HTMLInputElement>) => {
  //     if (e.target.files) {
  //       const data = new FormData();

  //       data.append('avatar', e.target.files[0]);

  //       api.patch('/users/avatar', data).then((response) => {
  //         updateUser(response.data);

  //         addToast({
  //           type: 'success',
  //           title: 'Avatar atualizado!',
  //           description: 'Seu avatar foi atualizado com sucesso!',
  //         });
  //       });
  //     }
  //   },
  //   [addToast, updateUser],
  // );

  return (
    <Container>
      <NavBar />

      <div id="page-wrap">
        <Header />

        <Content>
          <Form
            ref={formRef}
            onSubmit={handleSubmit}
            initialData={
              {
                // name: user.name,
                // whatsapp: user.whatsapp,
                // email: user.email,
              }
            }
          >
            <h1>Cadastrar Campanha</h1>

            <h3>Título da campanha *</h3>
            <Input name="title" placeholder="Título" />
            <h3>Descrição *</h3>
            <Input name="description" placeholder="Descrição" />
            <h3>Meta de arrecadação *</h3>
            <Input
              name="target_value"
              placeholder="Meta"
              type="number"
              inputMode="decimal"
              step=".01"
              icon={FiDollarSign}
            />
            <h3>Valor arrecadado *</h3>
            <Input
              name="received_value"
              placeholder="Arrecadado"
              type="number"
              inputMode="decimal"
              step=".01"
              icon={FiDollarSign}
            />
            <h3>
              Essa campanha é para algum animal? Se sim, selecione o animal
            </h3>
            <Select
              labelId="select-label-animal_id"
              id="simple-select-animal_id"
              value={animal}
              name="animal_id"
              onChange={handleChangeAnimal}
              style={{ textAlign: 'left' }}
            >
              <MenuItem key="0" value="0" style={{ padding: '10px' }}>
                Selecione um animal
              </MenuItem>
              {listaAnimais.map((anim) => (
                <MenuItem
                  style={{ padding: '10px' }}
                  key={anim.id}
                  value={anim.id}
                >
                  {anim.name}
                </MenuItem>
              ))}
            </Select>
            <Button type="submit">Cadastrar</Button>
            {/* <Button type="button" onClick={handleEndereco}>
              Atualizar endereço
            </Button> */}
          </Form>
        </Content>
      </div>
    </Container>
  );
};

export default NovaCampanha;
