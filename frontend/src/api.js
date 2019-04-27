import axios from 'axios';

export const post = (url, data, onSuccess, onFailure) => {
    axios({
        method: 'post', //you can set what request you want to be
        url: url,
        data: data,
        headers: {
            'authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyNGIzMGZiMC02ODgzLTExZTktOWJjMS0wYjRkZDM0NGZiZWIiLCJjcmVhdGVkX2F0IjoxNTU2MzI0ODM2NDc0LCJpYXQiOjE1NTYzMjQ4MzYsImV4cCI6MTU1ODkxNjgzNn0.q-_s-ge0Cye68MZrO9aNF3atGyCZ-TMuzkwU_R5zIe0'
        }
    })
        .then(response => {
            onSuccess(response);
        })
        .catch(error => {
            // console.log('Error msg ', error.response.data);
            onFailure(error);
        });

}


export const get = (url, id, onSuccess, onFailure) => {

    axios({
        method: 'get', //you can set what request you want to be
        url: url + id,
        headers: {
            'authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyNGIzMGZiMC02ODgzLTExZTktOWJjMS0wYjRkZDM0NGZiZWIiLCJjcmVhdGVkX2F0IjoxNTU2MzI0ODM2NDc0LCJpYXQiOjE1NTYzMjQ4MzYsImV4cCI6MTU1ODkxNjgzNn0.q-_s-ge0Cye68MZrO9aNF3atGyCZ-TMuzkwU_R5zIe0'
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