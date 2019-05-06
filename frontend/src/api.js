import axios from 'axios';

export const post = (url, data, onSuccess, onFailure) => {
    axios({
        method: 'post', //you can set what request you want to be
        url: url,
        data: data,
        headers: {
            'authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJkNjgxN2Q0MC02OTYzLTExZTktYWQ1My0wMTFlOGRhMWU1NGEiLCJjcmVhdGVkX2F0IjoxNTU2NDIxNDQwOTQwLCJpYXQiOjE1NTY0MjE0NDAsImV4cCI6MTU1OTAxMzQ0MH0.PL73dZ0c5u3_8_7kNrnBXVSALXS0pftlOi7dcEk9FPU'
        }
    })
        .then(response => {
            onSuccess(response);
        })
        .catch((error) => {
            console.log('Got error')
            // console.log('Error msg ', error.response.data);
            onFailure(error);
        });

}


export const get = (url, id, onSuccess, onFailure) => {

    axios({
        method: 'get', //you can set what request you want to be
        url: url + id,
        headers: {
            'authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJkNjgxN2Q0MC02OTYzLTExZTktYWQ1My0wMTFlOGRhMWU1NGEiLCJjcmVhdGVkX2F0IjoxNTU2NDIxNDQwOTQwLCJpYXQiOjE1NTY0MjE0NDAsImV4cCI6MTU1OTAxMzQ0MH0.PL73dZ0c5u3_8_7kNrnBXVSALXS0pftlOi7dcEk9FPU'
        }

    })
        .then(response => {
            onSuccess(response);
        })
        .catch(error => {
            console.log('Error msg ', error.response.data);
            onFailure(error);
        });



}