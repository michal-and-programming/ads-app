import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import {API_URL} from '../../../config';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [avatar, setAvatar] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append('login', login);
    fd.append('password', password);
    fd.append('phone', phone);
    fd.append('avatar', avatar);

    try{
      const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        body: fd,
        credentials: "include"
      });
      if(res.ok){
        navigate('/')
      }else{
        console.log('Registration error');
      }
    } catch(err){
      console.log(err)
    }
  }

  return(
    <Form onSubmit={handleSubmit}>
      <Form.Group className='mb-3' controlId='formLogin'>
        <Form.Label>Login</Form.Label>
        <Form.Control value={login} onChange={e => setLogin(e.target.value)} type="text" placeholder="Enter login" />
      </Form.Group>

      <Form.Group className='mb-3' controlId='formPassword'>
        <Form.Label>Password</Form.Label>
        <Form.Control value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" />
      </Form.Group>

      <Form.Group className='mb-3' controlId='formPhone'>
        <Form.Label>Phone number</Form.Label>
        <Form.Control value={phone} onChange={e => setPhone(e.target.value)} type="tel" placeholder="Phone number" />
      </Form.Group>

      <Form.Group className='mb-3' controlId='formFile'>
        <Form.Label>Avatar</Form.Label>
        <Form.Control type="file" onChange={e => setAvatar(e.target.files[0])} />
      </Form.Group>

      <Button type="submit" className="btn btn-primary">Submit</Button>
    </Form>
  )
}

export default Register;