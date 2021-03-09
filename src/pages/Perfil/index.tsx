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

interface ProfileFormData {
  name: string;
  whatsapp: string;
  email: string;
  old_password: string;
  password: string;
  password_confirmation: string;
}

const Perfil: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const { user, updateUser } = useAuth();

  const phoneRegExp = useMemo(() => {
    return /(\(?\d{2}\)?\s?)(\d{4,5}-?\d{4})$/;
  }, []);

  const handleSubmit = useCallback(
    async (data: ProfileFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          whatsapp: Yup.string()
            .matches(phoneRegExp, 'Formato(xx xxxxx-xxxx)')
            .required('WhatsApp obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          old_password: Yup.string(),
          password: Yup.string().when('old_password', {
            is: (val) => !!val.length,
            then: Yup.string().min(6, 'No mínimo 6 digitos'),
            otherwise: Yup.string(),
          }),
          password_confirmation: Yup.string()
            .when('old_password', {
              is: (val) => !!val.length,
              then: Yup.string().min(6, 'No mínimo 6 digitos'),
              otherwise: Yup.string(),
            })
            .oneOf([Yup.ref('password'), ''], 'Confirmação incorreta'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const {
          name,
          whatsapp,
          email,
          old_password,
          password,
          password_confirmation,
        } = data;

        const formData = {
          name,
          whatsapp,
          email,
          ...(old_password
            ? {
                old_password,
                password,
                password_confirmation,
              }
            : {}),
        };

        const response = await api.put('/profile', formData);

        updateUser(response.data);

        history.push('/home');

        addToast({
          type: 'success',
          title: 'Perfil atualizado!',
          description:
            'Suas informações do perfil foram atualizadas com sucesso!',
        });
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro na atualização',
          description: 'Ocorreu um erro ao atualizar o perfil, tente novamente',
        });
      }
    },
    [addToast, history, phoneRegExp, updateUser],
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

  const handleEndereco = useCallback(() => {
    history.push('/perfil/endereco');
  }, [history]);

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
              name: user.name,
              whatsapp: user.whatsapp,
              email: user.email,
            }}
          >
            <AvatarInput>
              {user.avatar_url ? (
                <img src={user.avatar_url} alt={user.name} />
              ) : (
                <img src={logoImg} alt={user.name} />
              )}
              <label htmlFor="avatar">
                <FiCamera />

                <input type="file" id="avatar" onChange={handleAvatarChange} />
              </label>
            </AvatarInput>

            <h1>Meu perfil</h1>

            <Input name="name" icon={FiUser} placeholder="Nome" />
            <Input name="whatsapp" icon={FiPhone} placeholder="WhatsApp" />
            <Input name="email" icon={FiMail} placeholder="E-mail" />

            <Input
              name="old_password"
              icon={FiLock}
              type="password"
              placeholder="Senha atual"
            />

            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Nova senha"
            />

            <Input
              name="password_confirmation"
              icon={FiLock}
              type="password"
              placeholder="Confirmar senha"
            />

            <Button type="submit">Confirmar mudanças</Button>
            <Button type="button" onClick={handleEndereco}>
              Atualizar endereço
            </Button>
          </Form>
        </Content>
      </div>
    </Container>
  );
};

export default Perfil;
