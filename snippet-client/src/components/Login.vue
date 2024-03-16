<template>
    <span class="background"></span>
    <section class="login-page">
        <div class="login-container">
            <header>
                Login
            </header>

        
            <div>
                <form>
                    <div class="form-layout">
                        <div class="field">
                            <!-- <label class="username-label" for="username">Username</label> -->
                            <input 
                                v-model="user.username"
                                placeholder="Username"
                                type="text"
                                class="username-input"
                            />
                        </div>
                    
                        <!-- <label class="password-label" for="password">Password</label> -->
                        <div class="field">
                            <input 
                                v-model="user.password"
                                type="text"
                                placeholder="Password"
                                class="password-input"
                            />
                        </div>
                        <div class="login-area">
                            <p class="error">{{ error }}</p>
                            <button @click="login" class="login-button" type="button">Login</button>
                            <p class="register">Don't have an account?<RouterLink to="/register"> Register</RouterLink></p>
                        </div>
                </div>
                </form>
            </div>
        
        </div>
    </section>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            user: {
                username: '',
                password: ''
            },
            error: null
        };
    },
    methods: {
        async login() {
            try {
                const user = this.user;
                const response = await axios.post(
                    'http://localhost:8080/users/login', 
                    user
                );
                console.log(response.data);

                const token = response.headers.authorization;

                console.log(token);

                localStorage.setItem('authToken', token);
                this.$router.push(`/profile/${response.data._id}`);
            } catch (error) {
                // client is reading from server to set error message
                this.error = error.response.data.error;
                console.log(error);
            }
        }
    }
}
</script>

<style scoped>
section {
    background: linear-gradient(90deg, rgba(79,70,229,1) 0%, rgba(81,81,182,1) 62%, rgba(0,212,255,1) 100%);
    height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.login-container {
    background-color: #f6f6f6;
    /* width: 50%;
    height: 50%;
    position: absolute;
    top:50%;
    left: 50%;
    margin: auto;
    transform: translate(-50%, -50%);
    padding: 10px;
    text-align: center; */
    width: 400px;
    padding: 40px 30px 50px 30px;
    text-align: center;
    border-radius: 10px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

}
.login-container header {
    font-size: 35px;
    font-weight: 600;
}
form {
    /* align-items: center; */
    /* height: 400px; */
    /* position: relative; */
    margin: 40px 0;
}
form .field {
    margin-bottom: 20px;
}
.form-layout {
    display: flex;
    flex-direction: column;
    flex:1;
}
.username-label {
    margin-right: 10px;
    text-align: start;
}
.username-input {
    background-image: url(../assets/icons/user.svg);
    background-position-y: center;
    background-size: 20px 20px;
    background-repeat: no-repeat;
    background-position: 20px;
    text-indent: 40px;
    /* margin-top: 7px; */
    width: 330px;
    
}
input {
    color:#333;
    margin-bottom: 15px;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #cfd7db;
    /* width: 184px;
    height: 48px; */
    width: 100%;
    /* height: 100%; */
    font-size: 18px;
}
.password-input {
    width: 330px;
    background-image: url(../assets/icons/lock.svg);
    background-position-y: center;
    background-size: 20px 20px;
    background-repeat: no-repeat;
    background-position: 20px;
    text-indent: 40px;
    margin-top: 10px;
}
.password-label {
    margin-right: 10px;
    text-align: start;
}
.login-button {
    background-color: #4f46e5;
    color: #fff;
    width: 330px;
    margin-bottom: 20px;
}

.login-button:hover {
    background-color:#fff;
    color: #4f46e5;
    border: 1px solid #4f46e5;
    
}


</style>