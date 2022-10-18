import React from 'react';
import { Popconfirm } from 'antd';
import EditStaff from './EditStaff';
import {
  Heading,
  Avatar,
  Box,
  Center,
  Text,
  Stack,
  Badge,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';

const StaffCard = ({
  s,
  user,
  edit,
  setEdit,
  handleDelete,
  departments,
  values,
  setValues,
  success,
  setSuccess,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div>
      <Center py={2}>
        <Box
          maxW={{ base: 'full', md: '320px' }}
          w={'full'}
          bg={useColorModeValue('white', 'gray.900')}
          boxShadow={'2xl'}
          rounded={'lg'}
          p={6}
          textAlign={'center'}
          pos={'relative'}
        >
          {user && user.status === 'admin' && (
            <Stack
              direction={'row'}
              pos={'absolute'}
              w={4}
              h={4}
              top={3}
              right={8}
              cursor={'pointer'}
            >
              <Text
                color={'blue.500'}
                onClick={() => {
                  setEdit(s);
                  onOpen();
                }}
              >
                <i className='fa-solid fa-pen-to-square'></i>{' '}
              </Text>
              <Popconfirm
                placement='top'
                title='Delete this staff?'
                onConfirm={() => handleDelete(s.staff_id)}
                okText='Yes'
                cancelText='No'
              >
                <Text color={'red.500'}>
                  <i className='fa-solid fa-trash-can'></i>
                </Text>
              </Popconfirm>
            </Stack>
          )}

          <Avatar
            size={'xl'}
            src={s.staff_image}
            alt={'Avatar Alt'}
            mb={4}
            pos={'relative'}
          />
          <Heading fontSize={'2xl'} fontFamily={'body'}>
            {s.staff_name}
          </Heading>
          <Text fontWeight={600} color={'gray.500'} mb={4}>
            {s.department_name}
          </Text>
          <Text
            textAlign={'center'}
            color={useColorModeValue('gray.700', 'gray.400')}
            px={3}
          >
            <i className='fa-solid fa-location-dot'></i> {s.staff_address}
          </Text>

          <Stack
            align={'center'}
            justify={'center'}
            direction={'column'}
            mt={5}
          >
            <Badge
              px={2}
              py={1}
              bg={useColorModeValue('gray.50', 'gray.800')}
              fontWeight={'400'}
            >
              <i className='fa-solid fa-square-phone'></i> &nbsp;{s.staff_phone}
            </Badge>
            <Badge
              px={2}
              py={1}
              bg={useColorModeValue('gray.50', 'gray.800')}
              fontWeight={'400'}
              textTransform='Lowercase'
            >
              <i className='fa-solid fa-envelope'></i> &nbsp;
              {s.staff_email}
            </Badge>
          </Stack>
        </Box>
      </Center>
      <EditStaff
        isOpen={isOpen}
        onClose={onClose}
        edit={edit}
        setEdit={setEdit}
        departments={departments}
        values={values}
        setValues={setValues}
        success={success}
        setSuccess={setSuccess}
      />
    </div>
  );
};

export default StaffCard;
