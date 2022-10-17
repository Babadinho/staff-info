import { editStaff } from '../actions/staff';
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

const EditStaff = ({
  departments,
  edit,
  success,
  setSuccess,
  isOpen,
  onClose,
}) => {
  const { token } = isAuthenticated();
  const [values, setValues] = useState({
    staff_name: '',
    staff_email: '',
    staff_phone: '',
    staff_address: '',
    staff_image: '',
    department: '',
  });
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await editStaff(
        { staff_id: edit && edit.staff_id, values },
        token
      );
      setSuccess(!success);
      setError('');
      onClose();
      message.success(res.data, 4);
    } catch (err) {
      console.log(err);
      if (err.response.status === 400) {
        setError(err.response.data);
      }
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Staff</ModalHeader>
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
                  value={staff_name ? staff_name : edit && edit.staff_name}
                  onChange={handleChange('staff_name')}
                />
              </FormControl>
              <FormControl id='staff_email'>
                <Input
                  type='email'
                  placeholder='Email'
                  value={staff_email ? staff_email : edit && edit.staff_email}
                  onChange={handleChange('staff_email')}
                />
              </FormControl>
              <FormControl id='staff_phone'>
                <Input
                  type='text'
                  placeholder='Phone'
                  value={staff_phone ? staff_phone : edit && edit.staff_phone}
                  onChange={handleChange('staff_phone')}
                />
              </FormControl>
              <FormControl id='staff_address'>
                <Input
                  type='text'
                  placeholder='Address'
                  value={
                    staff_address ? staff_address : edit && edit.staff_address
                  }
                  onChange={handleChange('staff_address')}
                />
              </FormControl>
              <FormControl id='staff_image'>
                <Input
                  type='text'
                  placeholder='Image'
                  value={staff_image ? staff_image : edit && edit.staff_image}
                  onChange={handleChange('staff_image')}
                />
              </FormControl>
              <FormControl id='staff_department'>
                <Select
                  onChange={handleChange('department')}
                  value={department ? department : edit && edit.department}
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

export default EditStaff;
