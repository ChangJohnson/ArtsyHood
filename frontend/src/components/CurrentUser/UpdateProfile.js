import styled from 'styled-components';
import { useAuth0 } from '@auth0/auth0-react';

import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const UpdateProfile = () => {
  const { isAuthenticated, user } = useAuth0();
  const navigate = useNavigate();

  // setting the value for all the input fields of the form

  const [name, setName] = useState();
  const [address, setAddress] = useState();
  const [apt, setApt] = useState();
  const [city, setCity] = useState();
  const [province, setProvince] = useState();
  const [postalCode, setPostalCode] = useState();
  const [country, setCountry] = useState();
  const [phoneNumber, setPhoneNumber] = useState();

  // POST. send all the info to backend from the filled up FORM
  const handleEditProfile = (e) => {
    e.preventDefault();
    fetch('/api/update/user', {
      body: JSON.stringify({
        userId: user.sub,
        name: name,
        address: address,
        apt: apt,
        city: city,
        province: province,
        postalCode: postalCode,
        country: country,
        phoneNumber: phoneNumber,
      }),
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          console.log(data.message);
          navigate('/userProfile');
        }
        if (data.status === 404) {
          console.log(data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {isAuthenticated ? (
        <div>
          <Form
            onSubmit={(e) => {
              handleEditProfile(e);
            }}
          >
            <InputTitle>Edit your profile:</InputTitle>
            <Input
              placeholder='Name'
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            ></Input>
            <Input
              placeholder='Address'
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
            ></Input>
            <Input
              placeholder='Apt.'
              value={apt}
              onChange={(e) => {
                setApt(e.target.value);
              }}
            ></Input>
            <Div2>
              <Input
                placeholder='City'
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                }}
              ></Input>
              <Input
                placeholder='Province'
                value={province}
                onChange={(e) => {
                  setProvince(e.target.value);
                }}
              ></Input>
            </Div2>
            <Div2>
              <Input
                placeholder='PostalCode'
                value={postalCode}
                onChange={(e) => {
                  setPostalCode(e.target.value);
                }}
              ></Input>
              <Input
                placeholder='Country'
                value={country}
                onChange={(e) => {
                  setCountry(e.target.value);
                }}
              ></Input>
            </Div2>
            <Input
              placeholder='Phone Number/Optional'
              value={phoneNumber}
              onChange={(e) => {
                setPhoneNumber(e.target.value);
              }}
            ></Input>
            {name && address && city && province && country && postalCode ? (
              <Button type='submit'>Submit</Button>
            ) : (
              <Button disabled>Submit</Button>
            )}
          </Form>
        </div>
      ) : (
        navigate('/please-signin')
      )}
    </>
  );
};

const Div2 = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  margin-top: 20px;
  background-color: #2279d2;
  height: 50px;
  color: white;
  font-weight: bold;
  border-radius: 50px;
  font-size: 20px;
  width: 100%;
  border: none;

  border: none;
  &:hover {
    cursor: pointer;
  }
`;

const InputTitle = styled.div`
  margin-top: 30px;
  font-size: 18px;
  margin-bottom: 15px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: fit-content;
  height: 70vh;
`;

const Input = styled.input`
  display: block;
  margin-top: 5px;
  padding: 0.7rem 1.1rem;
  box-sizing: border-box;
  color: inherit;
  width: 100%;
  font-family: inherit;
  font-size: 20px;
  font-weight: inherit;
  margin-top: 10px;
  line-height: 1.4;
  transition: box-shadow 300ms;
  ::placeholder {
    color: #b0bec5;
  }

  :focus {
    outline: none;
    box-shadow: 0.2rem 0.8rem 1.6rem #719ece;
  }
`;

export default UpdateProfile;
