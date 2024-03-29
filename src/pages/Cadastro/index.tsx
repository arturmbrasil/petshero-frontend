/* eslint-disable no-param-reassign */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useCallback, useMemo, useRef, useState } from 'react';
import {
  FiArrowLeft,
  FiMail,
  FiLock,
  FiUser,
  FiPhone,
  FiKey,
} from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';

import { useToast } from '../../hooks/toast';

import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, AnimationContainer, Background } from './styles';

interface CadastroFormData {
  name: string;
  email: string;
  password: string;
  whatsapp: string;
  pix: string;
  is_ong: boolean;
}

const Cadastro: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const [isOng, setIsOng] = useState<boolean>(false);

  const phoneRegExp = useMemo(() => {
    return /(\(?\d{2}\)?\s?)(\d{4,5}-?\d{4})$/;
  }, []);

  const handleSubmit = useCallback(
    async (data: CadastroFormData) => {
      try {
        formRef.current?.setErrors({});

        if (isOng) {
          const schema = Yup.object().shape({
            name: Yup.string().required('Nome obrigatório'),
            whatsapp: Yup.string()
              .matches(phoneRegExp, 'Formato(xx xxxxx-xxxx)')
              .required('WhatsApp obrigatório'),
            email: Yup.string()
              .required('E-mail obrigatório')
              .email('Digite um e-mail válido'),
            pix: Yup.string().required('Chave PIX obrigatória'),
            password: Yup.string().min(6, 'No mínimo 6 digitos'),
          });
          await schema.validate(data, {
            abortEarly: false,
          });
        } else {
          const schema = Yup.object().shape({
            name: Yup.string().required('Nome obrigatório'),
            whatsapp: Yup.string()
              .matches(phoneRegExp, 'Formato(xx xxxxx-xxxx)')
              .required('WhatsApp obrigatório'),
            email: Yup.string()
              .required('E-mail obrigatório')
              .email('Digite um e-mail válido'),

            password: Yup.string().min(6, 'No mínimo 6 digitos'),
          });
          await schema.validate(data, {
            abortEarly: false,
          });
        }

        data.is_ong = isOng;

        console.log(data);

        await api.post('/users', data);

        history.push('/');

        addToast({
          type: 'success',
          title: 'Cadastro realizado',
          description: 'Você já pode fazer seu login!',
        });
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro no cadastro',
          description: 'Ocorreu um erro ao fazer o cadastro, tente novamente',
        });
      }
    },
    [addToast, history, isOng, phoneRegExp],
  );

  const handleIsOngChange = useCallback(() => {
    setIsOng(!isOng);
  }, [isOng]);

  return (
    <Container>
      <Background />

      <Content>
        <AnimationContainer>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Cadastre-se</h1>

            <Input name="name" icon={FiUser} placeholder="Nome" />
            <Input name="whatsapp" icon={FiPhone} placeholder="Whatsapp" />
            <Input name="email" icon={FiMail} placeholder="E-mail" />

            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Senha"
            />

            {isOng && <Input name="pix" icon={FiKey} placeholder="Chave Pix" />}

            <label className="checkbox">
              <input
                name="isOng"
                type="checkbox"
                checked={isOng}
                onChange={handleIsOngChange}
              />
              SOU ONG
            </label>
            <Button color="orange" type="submit">
              CADASTRAR
            </Button>
          </Form>

          <Link to="/">
            <FiArrowLeft />
            Voltar para login
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default Cadastro;
