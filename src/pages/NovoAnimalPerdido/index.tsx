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
import { useHistory, Link } from 'react-router-dom';

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
  name: string;
  age: string;
  gender: string;
  size: string;
  species: string;
  breed: string;
  description: string;
}

// interface LostAnimal {
//   id: string;
//   name: string;
//   age: string;
//   gender: string;
//   size: string;
//   species: string;
//   breed: string;
//   description: string;
//   found: boolean;
//   avatar_url: string | null;
// }

const NovoAnimalPerdido: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const { user, updateUser } = useAuth();

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

        const response = await api.post('/lost-animals', formData);

        if (response.data.id)
          history.push(`/meus-animais/editar/${response.data.id}`);

        addToast({
          type: 'success',
          title: 'Animal perdido cadastrado!',
          description:
            'Cadastramos as informações do seu animal e esperamos que você o encontre logo!',
        });
        addToast({
          type: 'info',
          title: 'Experimente cadastrar uma foto!',
          description:
            'Cadastre uma foto do seu animal, assim as pessoas podem reconhecê-lo(a)!',
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
          description: 'Ocorreu um erro ao cadastrar o animal, tente novamente',
        });
      }
    },
    [addToast, history],
  );

  const handleAvatarChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const data = new FormData();

        data.append('avatar', e.target.files[0]);

        api.patch('/users/avatar', data).then((response) => {
          updateUser(response.data);

          addToast({
            type: 'success',
            title: 'Avatar atualizado!',
            description: 'Seu avatar foi atualizado com sucesso!',
          });
        });
      }
    },
    [addToast, updateUser],
  );

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
            <h1>Cadastrar Animal Perdido</h1>

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

export default NovoAnimalPerdido;
