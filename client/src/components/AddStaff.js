import axios from 'axios';
import { addNewStaff } from '../actions/staff';
import { message } from 'antd';
import { useState } from 'react';
import { isAuthenticated } from '../actions/auth';
import {
  FormControl,
  Input,
  Stack,
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Select,
} from '@chakra-ui/react';

const AddStaff = ({
  departments,
  values,
  setValues,
  success,
  setSuccess,
  isOpen,
  onClose,
}) => {
  const { token } = isAuthenticated();
  const {
    staff_name,
    staff_email,
    staff_phone,
    staff_address,
    staff_image,
    department,
  } = values;
  const [error, setError] = useState('');

  const handleChange = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await addNewStaff({ values }, token);
      setValues({
        staff_name: '',
        staff_email: '',
        staff_phone: '',
        staff_address: '',
        staff_image: '',
        department: '',
      });
      res && onClose();
      setSuccess(!success);
      message.success(res.data, 4);
    } catch (err) {
      console.log(err);
      if (err.response.status === 400) {
        setError(err.response.data);
      }
    }
  };

  const generateStaff = () => {
    axios.get('https://randomuser.me/api/').then((data) => {
      setValues({
        staff_name:
          data.data.results[0].name.first +
          ' ' +
          data.data.results[0].name.last,
        staff_email: data.data.results[0].email,
        staff_phone: data.data.results[0].phone,
        staff_address: `${data.data.results[0].location.street.number} ${data.data.results[0].location.street.name}, ${data.data.results[0].location.city} ${data.data.results[0].location.state} ${data.data.results[0].location.postcode}, ${data.data.results[0].location.country}`,
        staff_image: data.data.results[0].picture.large,
      });
      setError('');
    });
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Staff</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text color={'red'} mb='4' align='center'>
              {error}
            </Text>
            <Stack spacing={4}>
              <FormControl id='staff_name'>
                <Input
                  type='text'
                  placeholder='Name'
                  value={staff_name}
                  onChange={handleChange('staff_name')}
                />
              </FormControl>
              <FormControl id='staff_email'>
                <Input
                  type='email'
                  placeholder='Email'
                  value={staff_email}
                  onChange={handleChange('staff_email')}
                />
              </FormControl>
              <FormControl id='staff_phone'>
                <Input
                  type='text'
                  placeholder='Phone'
                  value={staff_phone}
                  onChange={handleChange('staff_phone')}
                />
              </FormControl>
              <FormControl id='staff_address'>
                <Input
                  type='text'
                  placeholder='Address'
                  value={staff_address}
                  onChange={handleChange('staff_address')}
                />
              </FormControl>
              <FormControl id='staff_image'>
                <Input
                  type='text'
                  placeholder='Image'
                  value={staff_image}
                  onChange={handleChange('staff_image')}
                />
              </FormControl>
              <FormControl id='staff_department'>
                <Select
                  onChange={handleChange('department')}
                  value={department}
                  placeholder='Select department'
                >
                  {departments &&
                    departments.length > 0 &&
                    departments.map((d, i) => {
                      return (
                        <option key={i} value={d.department_id}>
                          {d.department_name}
                        </option>
                      );
                    })}
                </Select>
              </FormControl>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button variant='ghost' mr={3} onClick={generateStaff}>
              Generate random details
            </Button>
            <Button
              bg='blue.600'
              color='white'
              onClick={handleSubmit}
              _hover={{
                bg: 'blue.500',
              }}
            >
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddStaff;
