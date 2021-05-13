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
import {
  useHistory,
  Link,
  RouteComponentProps,
  withRouter,
} from 'react-router-dom';

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
import defaultImg from '../../assets/default.png';

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

interface CampanhaInterface {
  id: string;
  ong_id: string;
  animal_id: string;
  target_value: string;
  received_value: string;
  title: string;
  description: string;
  activated: boolean;
  ong: {
    id: string;
    name: string;
    whatsapp: string;
    email: string;
    avatar_url: string | null;
  };
  ongAnimal: {
    id: string;
    name: string;
    age: string;
    gender: string;
    size: string;
    species: string;
    breed: string;
    adopted: boolean;
    description: string;
    avatar_url: string | null;
  };
  avatar_url: string | null;
}

type DetailParams = {
  id: string;
};
type DetailProps = RouteComponentProps<DetailParams>;

const EditarCampanh: React.FC<DetailProps> = ({ match }) => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const { user, updateUser } = useAuth();

  const [animal, setAnimal] = React.useState(null);
  const [listaAnimais, setListaAnimais] = useState<Animal[]>([]);

  const [campanha, setCampanha] = useState<CampanhaInterface | null>(
    {} as CampanhaInterface,
  );

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

        const response = await api.put(`/campaigns/${campanha?.id}`, formData);

        if (response.data.id) history.push(`/minhas-campanhas`);

        addToast({
          type: 'success',
          title: 'Campanha atualizada!',
          description: 'As informações foram atualizadas!',
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
            'Ocorreu um erro ao atualizar a campanha, tente novamente',
        });
      }
    },
    [animal, campanha, history, addToast],
  );

  const handleAvatarChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const data = new FormData();

        data.append('avatar', e.target.files[0]);

        api
          .patch(`/campaigns/avatar/${campanha?.id}`, data)
          .then((response) => {
            setCampanha(response.data);
            addToast({
              type: 'success',
              title: 'Foto atualizada!',
              description: 'Cadastramos a foto da sua campanha!',
            });
          });
      }
    },
    [addToast, campanha],
  );

  const handleChangeStatus = useCallback(async () => {
    if (campanha?.activated === true) {
      api
        .put(`/campaigns/${campanha?.id}`, {
          activated: false,
        })
        .then((response) => {
          console.log(response.data.activated);

          setCampanha(response.data);
          addToast({
            type: 'success',
            title: 'Status atualizado!',
            description: 'O status da sua campanha foi atualizado',
          });
        });
    } else {
      api
        .put(`/campaigns/${campanha?.id}`, {
          activated: true,
        })
        .then((response) => {
          setCampanha(response.data);
          addToast({
            type: 'success',
            title: 'Status atualizado!',
            description: 'O status da sua campanha foi atualizado',
          });
        });
    }
  }, [addToast, campanha]);

  const handleChangeAnimal = useCallback((event) => {
    setAnimal(event.target.value);
  }, []);

  useEffect(() => {
    api
      .get(`/campaigns`, { params: { id: match?.params?.id } })
      .then((response) => {
        setCampanha(response.data[0]);
        setAnimal(
          response.data[0]?.animal_id ? response.data[0]?.animal_id : '0',
        );
      })
      .catch((err) => {
        setCampanha(null);
      });

    api
      .get(`/ongs/animals`, { params: { ong_id: user.id } })
      .then((response) => {
        setListaAnimais(response.data);
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
              title: campanha?.title,
              description: campanha?.description,
              target_value: campanha?.target_value,
              received_value: campanha?.received_value,
            }}
          >
            <AvatarInput>
              {campanha?.avatar_url ? (
                <img src={campanha?.avatar_url} alt={campanha?.title} />
              ) : (
                <img src={defaultImg} alt={campanha?.title} />
              )}
              <label htmlFor="avatar">
                <FiCamera />

                <input type="file" id="avatar" onChange={handleAvatarChange} />
              </label>
            </AvatarInput>

            <h1>Editar Campanha</h1>
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

            <h3>
              Status: {campanha?.activated === true ? 'Ativa' : 'Inativa'}
            </h3>
            {campanha?.activated === true ? (
              <Button
                onClick={handleChangeStatus}
                style={{ marginTop: '-8px' }}
                type="button"
              >
                Desativar campanha!
              </Button>
            ) : (
              <Button
                onClick={handleChangeStatus}
                style={{ marginTop: '-8px' }}
                type="button"
              >
                Ativar campanha!
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

export default withRouter(EditarCampanh);
