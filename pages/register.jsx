import {useState, useContext} from 'react';
import { REGISTER_USER } from '../graphql/mutations/sampleMutations';//imported the mutation
import { useMutation } from '@apollo/client';
import toast, { Toaster } from 'react-hot-toast';
import CircularLoading from '../components/circularLoading';
import {useRouter} from 'next/router';
import {useForm} from '../util/hooks';
import {AuthContext} from '../context/auth';

//TODO: Redirect logged in users to home if they access login or register pages when they are logged in

function Register(){
    const context = useContext(AuthContext);
    const router = useRouter();
    // Monitor state of errors, initializes empty object
    const [errors, setErrors] = useState({});

    const {onChange, onSubmit, values} = useForm(registerUser, {
        username: '',
        password: "",
        confirmPassword: "",
        account_email:"",
        account_mobile:"",
        role:"FARMER"
    });
    //upon changing something on input field, update that value(values)
    // const onChange = (event) =>{
    //     setValues({...values, [event.target.name]: event.target.value});
    // };

    // the Graphql Mutation
    const [addUser, {loading}] = useMutation(REGISTER_USER, {
        update(proxy, {data:{register:userData}}){
            //console.log(result);
            context.login(userData);
            
        },
        // Display error
        onError(err){
            //console.log(err.graphQLErrors[0].extensions.errors);
            setErrors(err.graphQLErrors[0].extensions.errors);
        },
        // display toast upon completion
        onCompleted:(data)=>{
            toast.success("User successfully Registered");
            router.push('/login');
        },
        //variables to pass on mutation, copy paste from apollo playground then only change the value
        variables:{
            "registerInput": {
              "username": values.username,
              "password": values.password,
              "confirmPassword": values.confirmPassword,
              "account_email": values.account_email,
              "account_mobile": values.account_mobile,
              "role": values.role
            }
          }
    });

    // The callback Function you pass on UseForm upon onSubmit
    function registerUser(){
        addUser();
    }
    //Event upon clicking submit button
    // const onSubmit = (event) =>{
    //     event.preventDefault();
    //     addUser();
        

    // };
    
    if(loading){
        // if still loading, show circular loading
        return(<CircularLoading/>);
    } else{
        return(
            <div>
                {/* Toaster is used to make the toast funcation work */}
                <Toaster />
                <form onSubmit={onSubmit}>
                    <label htmlFor="username">Username</label><br/>
                    <input type="text" 
                        id="username" 
                        name="username" 
                        value={values.username} 
                        onChange={onChange}
                       /><br/>
    
                    <label htmlFor="password">Pasword</label><br/>
                    <input type="password" 
                        id="password" 
                        name="password" 
                        value={values.password} 
                        onChange={onChange}
                        
                        /><br/>
    
                    <label htmlFor="confirmPassword">Confirm Pasword</label><br/>
                    <input type="password" 
                        id="confirmPassword" 
                        name="confirmPassword"
                        value = {values.confirmPassword} 
                        onChange={onChange}
                        
                        /><br/>
    
                    <label htmlFor="email">email</label><br/>
                    <input type="email" 
                        id="email" 
                        value={values.account_email}
                        name="account_email" 
                        onChange={onChange}
                           
                        />
    
                    <p>Or</p>
    
                    <label htmlFor="phone_number">Phone Number</label><br />
                    <input type="text" 
                        id="phone_number" 
                        name="account_mobile"
                        value={values.account_mobile}
                        onChange={onChange}
                        
                        /><br />
    
                    {/* TODO:optional serverside validation for role */}
                    <label htmlFor="farmer">Farmer</label>
                    <input type="radio" 
                        id="farmer" 
                        name="role" 
                        value="FARMER" 
                        checked = {values.role === "FARMER"} 
                        onChange={onChange}
                        

                        />
    
                    <label htmlFor="buyer">Buyer</label>
                    <input type="radio" 
                        id="buyer" 
                        name="role" 
                        value="BUYER"
                        checked = {values.role ==="BUYER"}
                        onChange={onChange}
                        /><br />
    
                    <button type="submit">Submit</button>
                </form>
                {/* <displayError err = {errors}/> */}
                {/* Display if error */}
                {Object.keys(errors).length > 0 && (
                    <div>
                        <ul>
                            {Object.values(errors).map ((value)=>(
                                <li key={value}>{value}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        );
    }
}

// function displayError({err}){
//     if(err>0){
//         return(
//             err
//         )
//     }
// }

export default Register;