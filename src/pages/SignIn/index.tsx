/* eslint-disable react/no-unescaped-entities */
import React, { useCallback, useRef } from 'react';
import { FiHash, FiKey, FiLogIn } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
// @ts-ignore
import PWAPrompt from 'react-ios-pwa-prompt';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
import getValidationErrors from '../../utils/getValidationErrors';

// import logoImg from '../../assets/logo.svg';
import logoImg from '../../assets/logo.png';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, AnimationContainer, Background } from './styles';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { signIn } = useAuth();
  const { addToast } = useToast();

  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string().required('Email obrigatório'),
          password: Yup.string().required('Senha obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await signIn({
          email: data.email,
          password: data.password,
        });

        history.push('/home');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
          return;
        }
        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description: `Ocorreu um erro ao fazer login, cheque as credenciais.${err}`,
        });
      }
    },
    [signIn, history, addToast],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Pet's Hero!</h1>
            <Input name="email" icon={FiHash} placeholder="Email" />

            <Input
              name="password"
              icon={FiKey}
              type="password"
              placeholder="Senha"
            />

            <Button color="orange" type="submit">
              ENTRAR
            </Button>
          </Form>

          <Link to="/cadastro">
            <FiLogIn />
            Criar conta
          </Link>
        </AnimationContainer>
      </Content>
      <Background />
      <PWAPrompt
        promptOnVisit={1}
        timesToShow={3}
        copyTitle="Instalar o Pet's Hero!"
        copyBody="Para utilizar melhor o Pet's Hero, instale a nossa aplicação na sua tela inicial"
        copyShareButtonLabel="1) Pressione o botão 'Compartilhar'."
        copyAddHomeButtonLabel="2) Pressione 'Adicionar à Tela de Início'."
        copyClosePrompt="Fechar"
        permanentlyHideOnDismiss={false}
      />
    </Container>
  );
};

export default SignIn;
