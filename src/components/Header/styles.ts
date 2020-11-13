import styled from 'styled-components';

export const Container = styled.header`
  padding: 16px 0;
  background: #5647fe;
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  max-width: 1120px;

  margin-left: 88px;

  span {
    font-family: 'Open Sans';
    font-weight: 400;
    font-size: 16px;

    color: #fff;

    strong {
      font-weight: 600;
      color: #fff;
    }
  }
`;
