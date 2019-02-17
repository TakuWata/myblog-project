import requestToModel from '../apis/requestToModel';
import auth from '../apis/auth';
import * as actionTypes from './actionType';

const config = {
    params: { ordering: "-published_at" }
}

export const fetchPosts = () => async dispatch => {
    const response = await requestToModel.get('/posts', config);
    dispatch({ type: 'FETCH_POSTS', payload: response.data });
} 

export const DeletePost = (id) => async dispatch => {
    await requestToModel.delete(`/posts/${id}`);
    dispatch({ type: 'DELETE_POST' })
}

export const fetchSearchResults = (term) => async dispatch => {
    const response = await requestToModel.get('/posts', {params: { search: term }});
    dispatch({ type: 'SEARCH_RESULTS', payload: response.data });
};

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token
    }
}

export const authFail = error => {
    return{
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
}

export const checkAuthTimeout = expirationTime => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000)
        // 元の単位はmili secondなので1000倍
    }
}

export const authLogin = (email, password) => {
    return dispatch => {
        dispatch(authStart());
        auth.post('/rest-auth/login/',{
            email: email,
            password: password
        })
        .then(res => {
            const token = res.data.key;
            const expirationDate = new Date(new Date().getTime + 3600 * 1000)
            // これで1 hourらしい
            // 以下でこれらの情報をブラウザのlocal strageへ保存できる
            // redux storeに保存したら、リロードで消えてしまうため、ブラウザに保存する必要がある。
            localStorage.setItem('token', token);
            localStorage.setItem('expirationDate', expirationDate);
            dispatch(authSuccess(token))
            dispatch(checkAuthTimeout(3600))
        })
        .catch(err => {
            dispatch(authFail(err))
        })
    }
}

export const authSignup = (username, email, password1, password2) => {
    return dispatch => {
        dispatch(authStart());
        auth.post('/rest-auth/registration/', {
            username: username,
            email: email,
            password1: password1,
            password2: password2
        })
            .then(res => {
                const token = res.data.key;
                const expirationDate = new Date(new Date().getTime + 3600 * 1000)
                // これで1 hourらしい
                // 以下でこれらの情報をブラウザのlocal strageへ保存できる
                // redux storeに保存したら、リロードで消えてしまうため、ブラウザに保存する必要がある。
                localStorage.setItem('token', token);
                localStorage.setItem('expirationDate', expirationDate);
                dispatch(authSuccess(token))
                dispatch(checkAuthTimeout(3600))
            })
            .catch(err => {
                dispatch(authFail(err))
            })
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (token === undefined){
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'))
            if (expirationDate <= new Date()) {
                // expが今日より小さい、つまり期限切れ
                dispatch(logout())
            } else {
                dispatch(authSuccess(token));
                dispatch(checkAuthTimeout (( expirationDate.getTime() - new Date().getTime() )/1000 ));
            }
        }
    }
}

// onSearchSubmit = async (term) => {

//     const config = {
//         params: { search: term }
//     }

//     const response = await axios.get('http://localhost:8000/api/posts/', config)

//     this.setState({ results: response.data });
//     console.log(response);
//     console.log(this.state.results);
// }

// onPostDelete = event => {
//     const id = this.props.match.params.id;
//     console.log("id for delete", id);
//     axios.delete(`http://localhost:8000/api/posts/${id}/`);
//     this.props.history.push('/home');
//     this.forceUpdate();
// }