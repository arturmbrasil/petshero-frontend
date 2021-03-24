import React, {
  useCallback,
  useEffect,
  useState,
  useRef,
  ChangeEvent,
} from 'react';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { useHistory, Link } from 'react-router-dom';

import { Container, Content, AvatarInput } from './styles';
import NavBar from '../../../components/NavBar';

import Header from '../../../components/Header';
import Input from '../../../components/Input';
import Button from '../../../components/Button';

import api from '../../../services/api';

import { useToast } from '../../../hooks/toast';
import getValidationErrors from '../../../utils/getValidationErrors';
import { useAuth } from '../../../hooks/auth';

interface ProfileFormData {
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  uf: string;
  cep: string;
}

const Endereco: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const { user, updateUser } = useAuth();

  const handleSubmit = useCallback(
    async (data: ProfileFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          street: Yup.string().required('Rua obrigatória'),
          number: Yup.string().required('Número obrigatório'),
          neighborhood: Yup.string().required('Bairro obrigatório'),
          city: Yup.string().required('Cidade obrigatória'),
          uf: Yup.string().required('UF obrigatória'),
          cep: Yup.string().required('CEP obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const { street, number, neighborhood, city, uf, cep } = data;

        const formData = { street, number, neighborhood, city, uf, cep };

        const response = await api.post('/users/address', formData);

        const updatedUser = await api.get('/profile');

        updateUser(updatedUser.data);

        history.push('/perfil');

        addToast({
          type: 'success',
          title: 'Endereço atualizado!',
          description: 'O seu endereço foi atualizado com sucesso!',
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
          description:
            'Ocorreu um erro ao atualizar o endereço, tente novamente',
        });
      }
    },
    [addToast, history, updateUser],
  );

  const handleGoBack = useCallback(() => {
    history.goBack();
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
              street: user.address?.street,
              number: user.address?.number,
              neighborhood: user.address?.neighborhood,
              city: user.address?.city,
              uf: user.address?.uf,
              cep: user.address?.cep,
            }}
          >
            <h1>Meu endereço</h1>

            <Input name="street" placeholder="Rua" />
            <Input name="number" placeholder="Número" />
            <Input name="neighborhood" placeholder="Bairro" />
            <Input name="city" placeholder="Cidade" />
            <Input name="uf" placeholder="UF" />
            <Input name="cep" placeholder="CEP" />

            <Button type="submit">Atualizar endereço</Button>
            <Button type="button" onClick={handleGoBack}>
              Voltar
            </Button>
          </Form>
        </Content>
      </div>
    </Container>
  );
};

export default Endereco;
