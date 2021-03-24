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
} from 'react-icons/fi';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import {
  useHistory,
  Link,
  RouteComponentProps,
  withRouter,
} from 'react-router-dom';

import { Container, Content, AvatarInput } from './styles';
import NavBar from '../../components/NavBar';

import Header from '../../components/Header';
import Input from '../../components/Input';
import Button from '../../components/Button';

import api from '../../services/api';

import { useToast } from '../../hooks/toast';
import getValidationErrors from '../../utils/getValidationErrors';
import { useAuth } from '../../hooks/auth';
import defaultImg from '../../assets/default.png';

interface FormData {
  name: string;
  age: string;
  gender: string;
  size: string;
  species: string;
  breed: string;
  description: string;
}

interface LostAnimal {
  id: string;
  name: string;
  age: string;
  gender: string;
  size: string;
  species: string;
  breed: string;
  description: string;
  found: boolean;
  updated_at: string;
  avatar_url: string | null;
  owner: {
    name: string;
    whatsapp: string;
  };
  linkWhats: string;
}

type DetailParams = {
  id: string;
};
type DetailProps = RouteComponentProps<DetailParams>;

const EditarAnimalPerdido: React.FC<DetailProps> = ({ match }) => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const { user, updateUser } = useAuth();

  const [lostAnimal, setLostAnimal] = useState<LostAnimal | null>(
    {} as LostAnimal,
  );

  const handleSubmit = useCallback(
    async (data: FormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          age: Yup.string().required('Idade obrigatória'),
          gender: Yup.string().required('Sexo obrigatório'),
          size: Yup.string().required('Porte obrigatório'),
          species: Yup.string().required('Espécie obrigatória'),
          breed: Yup.string().required('Raça obrigatória'),
          description: Yup.string().required('Descrição obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const { name, age, gender, size, species, breed, description } = data;

        const formData = {
          name,
          age,
          gender,
          size,
          species,
          breed,
          description,
        };
        const response = await api.put(
          `/lost-animals/${lostAnimal?.id}`,
          formData,
        );

        if (response.data.id) history.push(`/meus-animais`);

        addToast({
          type: 'success',
          title: 'Animal perdido atualizado!',
          description:
            'Atualizamos as informações do seu animal e esperamos que você o encontre logo!',
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
          description: 'Ocorreu um erro ao atualizar o animal, tente novamente',
        });
      }
    },
    [addToast, history, lostAnimal],
  );

  const handleAvatarChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const data = new FormData();

        data.append('avatar', e.target.files[0]);

        api
          .patch(`/lost-animals/avatar/${lostAnimal?.id}`, data)
          .then((response) => {
            setLostAnimal(response.data);
            addToast({
              type: 'success',
              title: 'Foto atualizada!',
              description:
                'Cadastramos a foto do seu animal, agora será mais fácil encontrá-lo(a)',
            });
          });
      }
    },
    [addToast, lostAnimal],
  );

  const handleChangeStatus = useCallback(async () => {
    if (lostAnimal?.found === true) {
      api
        .put(`/lost-animals/${lostAnimal?.id}`, {
          found: false,
        })
        .then((response) => {
          console.log(response.data.found);

          setLostAnimal(response.data);
          addToast({
            type: 'success',
            title: 'Status atualizado!',
            description: 'O status do seu animal foi atualizado',
          });
        });
    } else {
      api
        .put(`/lost-animals/${lostAnimal?.id}`, {
          found: true,
        })
        .then((response) => {
          setLostAnimal(response.data);
          addToast({
            type: 'success',
            title: 'Status atualizado!',
            description: 'O status do seu animal foi atualizado',
          });
        });
    }
  }, [addToast, lostAnimal]);

  useEffect(() => {
    api
      .get(`/lost-animals`, { params: { id: match?.params?.id } })
      .then((response) => {
        setLostAnimal(response.data[0]);
      })
      .catch((err) => {
        setLostAnimal(null);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <NavBar />

      <div id="page-wrap">
        <Header />

        <Content>
          <Form
            ref={formRef}
            onSubmit={handleSubmit}
            initialData={{
              name: lostAnimal?.name,
              age: lostAnimal?.age,
              gender: lostAnimal?.gender,
              size: lostAnimal?.size,
              species: lostAnimal?.species,
              breed: lostAnimal?.breed,
              description: lostAnimal?.description,
            }}
          >
            <AvatarInput>
              {lostAnimal?.avatar_url ? (
                <img src={lostAnimal?.avatar_url} alt={lostAnimal?.name} />
              ) : (
                <img src={defaultImg} alt={lostAnimal?.name} />
              )}
              <label htmlFor="avatar">
                <FiCamera />

                <input type="file" id="avatar" onChange={handleAvatarChange} />
              </label>
            </AvatarInput>

            <h1>Editar Animal Perdido</h1>

            <h3>Nome</h3>
            <Input name="name" placeholder="Nome" />
            <h3>Idade</h3>
            <Input name="age" placeholder="Idade" type="numeric" />
            <h3>Sexo</h3>
            <Input name="gender" placeholder="Sexo" />
            <h3>Porte</h3>
            <Input name="size" placeholder="Porte" />
            <h3>Espécie</h3>
            <Input name="species" placeholder="Espécie" />
            <h3>Raça</h3>
            <Input name="breed" placeholder="Raça" />
            <h3>Descrição</h3>
            <Input name="description" placeholder="Descrição" />

            <h3>
              Status: {lostAnimal?.found === true ? 'Encontrado' : 'Perdido'}
            </h3>
            {lostAnimal?.found === true ? (
              <Button
                onClick={handleChangeStatus}
                style={{ marginTop: '-8px' }}
                type="button"
              >
                Marcar como perdido!
              </Button>
            ) : (
              <Button
                onClick={handleChangeStatus}
                style={{ marginTop: '-8px' }}
                type="button"
              >
                Marcar como encontrado!
              </Button>
            )}
            <Button type="submit">Atualizar</Button>
            {/* <Button type="button" onClick={handleEndereco}>
              Atualizar endereço
            </Button> */}
          </Form>
        </Content>
      </div>
    </Container>
  );
};

export default withRouter(EditarAnimalPerdido);
