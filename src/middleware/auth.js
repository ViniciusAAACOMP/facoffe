const axios = require('axios');
const { response } = require('express');
const jwt = require('jsonwebtoken');

function obterToken(email, senha) {
  const realmUrl = 'https://auth.facoffee.hsborges.dev/realms/facoffee';
  const tokenUrl = `${realmUrl}/protocol/openid-connect/token`;

  const clientId = 'facoffee';
  const grantType = 'password';
  const username = email;
  const password = senha;
  const scope = 'openid';

  const tokenConfig = {
    method: 'post',
    url: tokenUrl,
    auth: {
      username: clientId
    },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: `grant_type=${grantType}&username=${username}&password=${password}&scope=${scope}`,
  };

  return axios(tokenConfig)
    .then(response => {
      const token = response.data.access_token;

      const decodedToken = jwt.decode(token);
      if (!decodedToken) {
        throw new Error('Erro ao decodificar o token.');
      }

      return {
        token: token,
        decodedToken: decodedToken,
      };
    })
    .catch(error => {
      throw new Error(`Falha na solicitação: ${error.response.status}, ${error.response.data}`);
    });
}

function decodeToken(token) {
  try {
    const decodedToken = jwt.decode(token);
    if (!decodedToken) {
      throw new Error('Erro ao decodificar o token.');
    }
    return decodedToken;
  } catch (error) {
    throw new Error(`Erro ao decodificar o token: ${error.message}`);
  }
}

function validateUser(token) {
  var options = {
    method: 'GET',
    url: 'https://auth.facoffee.hsborges.dev/realms/facoffee/protocol/openid-connect/userinfo',
    headers: {
      'User-Agent': 'insomnia/8.3.0',
      Authorization: 'Bearer ' + token
    }
  };
  
  return axios.request(options)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.error(error);
      throw error;
    });
}


module.exports = { obterToken, decodeToken, validateUser };
