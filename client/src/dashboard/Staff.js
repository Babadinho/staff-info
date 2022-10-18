import {
  Box,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  useColorModeValue,
  useDisclosure,
  SimpleGrid,
  Link,
} from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { getDepartments, getDepartment } from '../actions/department';
import { getStaff, deleteStaff, searchStaff } from '../actions/staff';
import AddStaff from '../components/AddStaff';
import { message } from 'antd';
import { isAuthenticated } from '../actions/auth';
import StaffCard from '../components/StaffCard';

const Staff = () => {
  const { user, token } = isAuthenticated();
  const [departments, setDepartments] = useState();
  const [staff, setStaff] = useState();
  const [edit, setEdit] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [values, setValues] = useState({
    staff_name: '',
    staff_email: '',
    staff_phone: '',
    staff_address: '',
    staff_image: '',
    department: '',
  });
  const sidebar = useDisclosure();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedOption, setSelectedOption] = useState(null);
  const color = useColorModeValue('gray.600', 'gray.300');
  const [search, setSearch] = useState('');

  const loadDepartments = async () => {
    const res = await getDepartments(token);
    setDepartments(res.data);
  };

  const loadStaff = async () => {
    if (selectedOption === null || selectedOption === 6) {
      const res = await getStaff(token);
      setStaff(res.data);
    } else {
      try {
        const res = await getDepartment(
          selectedOption && selectedOption,
          token
        );
        setStaff(res.data);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleDelete = async (staffId) => {
    try {
      const res = await deleteStaff({ staffId }, token);
      message.success(res.data, 4);
      setSuccess(!success);
    } catch (err) {
      if (err.response.status === 400) {
        message.error(err.response.data, 4);
      }
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await searchStaff({ search }, token);
      setStaff(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadDepartments();
    loadStaff();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success, selectedOption]);

  const handleLogout = () => {
    window.localStorage.removeItem('staff-info');
    window.location.reload();
  };

  const NavItem = (props) => {
    const { icon, children, ...rest } = props;
    return (
      <Flex
        align='center'
        px='4'
        pl='6'
        py='3'
        cursor='pointer'
        color='white'
        _dark={{ color: 'gray.400' }}
        _hover={{
          bg: 'gray.100',
          _dark: { bg: 'gray.900' },
          color: 'gray.900',
        }}
        role='group'
        fontWeight='semibold'
        transition='.15s ease'
        {...rest}
      >
        {icon && (
          <Icon
            mx='2'
            boxSize='4'
            _groupHover={{
              color: color,
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    );
  };

  const SidebarContent = (props) => (
    <Box
      as='nav'
      pos='fixed'
      top='0'
      left='0'
      zIndex='sticky'
      h='full'
      pb='10'
      overflowX='hidden'
      overflowY='auto'
      bg='blue.700'
      _dark={{ bg: 'gray.800' }}
      w='60'
      {...props}
    >
      <Flex px='4' py='15.8px' align='center'>
        <Text
          fontSize='20px'
          ml='2'
          color='white'
          _dark={{ color: 'white' }}
          fontWeight='semibold'
        >
          <i className='fa-solid fa-users'></i> STAFF INFO
        </Text>
      </Flex>
      <Flex
        direction='column'
        as='nav'
        fontSize='sm'
        color='gray.600'
        aria-label='Main Navigation'
        py='6'
      >
        <NavItem
          onClick={() => {
            setSelectedOption(6);
            sidebar.onClose();
          }}
        >
          <i className='fa-solid fa-users'></i> &nbsp;All Departments
        </NavItem>
        <NavItem
          onClick={() => {
            setSelectedOption(1);
            sidebar.onClose();
          }}
        >
          <i className='fa-solid fa-users-viewfinder'></i> &nbsp;Human Resources
        </NavItem>
        <NavItem
          onClick={() => {
            setSelectedOption(2);
            sidebar.onClose();
          }}
        >
          <i className='fa-solid fa-users-line'></i> &nbsp;Accounting and
          Finance
        </NavItem>
        <NavItem
          onClick={() => {
            setSelectedOption(3);
            sidebar.onClose();
          }}
        >
          <i className='fa-solid fa-users-rays'></i> &nbsp;Marketing
        </NavItem>
        <NavItem
          onClick={() => {
            setSelectedOption(4);
            sidebar.onClose();
          }}
        >
          <i className='fa-solid fa-people-carry-box'></i> &nbsp;Production
        </NavItem>
        <NavItem
          onClick={() => {
            setSelectedOption(5);
            sidebar.onClose();
          }}
        >
          <i className='fa-solid fa-users-gear'></i> &nbsp;IT
        </NavItem>
        <NavItem onClick={handleLogout}>
          <i className='fa-solid fa-right-from-bracket'></i> &nbsp;Sign out
        </NavItem>
      </Flex>
    </Box>
  );

  return (
    <>
      <Box as='section' bg='gray.50' _dark={{ bg: 'gray.700' }} minH='100vh'>
        <SidebarContent display={{ base: 'none', md: 'unset' }} />
        <Drawer
          isOpen={sidebar.isOpen}
          onClose={sidebar.onClose}
          placement='left'
        >
          <DrawerOverlay />
          <DrawerContent>
            <SidebarContent w='full' borderRight='none' />
          </DrawerContent>
        </Drawer>
        <Box ml={{ base: 0, md: 60 }} transition='.3s ease'>
          <Flex
            as='header'
            align='center'
            justify='space-between'
            w='full'
            px='4'
            bg='white'
            borderBottomWidth='1px'
            h='16'
          >
            <IconButton
              aria-label='Menu'
              display={{ base: 'inline-flex', md: 'none' }}
              onClick={sidebar.onOpen}
              icon={<i className='fa-solid fa-bars'></i>}
              size='md'
            />
            <form onSubmit={handleSearch}>
              <div className='form-group'>
                <InputGroup w={{ base: '75vw', md: '50vw' }}>
                  <InputLeftElement color='gray.500'>
                    <i className='fa-solid fa-magnifying-glass'></i>
                  </InputLeftElement>{' '}
                  <Input
                    placeholder='Search for staff...'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    borderRadius='5px'
                  />
                </InputGroup>
              </div>
            </form>
          </Flex>

          <Box as='main' p='4'>
            <SimpleGrid minChildWidth='300px' spacing='15px'>
              {staff &&
                staff.length > 0 &&
                staff.map((s, i) => {
                  return (
                    <StaffCard
                      s={s}
                      key={i}
                      user={user}
                      edit={edit}
                      setEdit={setEdit}
                      departments={departments}
                      values={values}
                      setValues={setValues}
                      success={success}
                      setSuccess={setSuccess}
                      handleDelete={handleDelete}
                    />
                  );
                })}
            </SimpleGrid>
          </Box>
        </Box>
        <AddStaff
          setError={setError}
          error={error}
          departments={departments}
          values={values}
          onOpen={onOpen}
          isOpen={isOpen}
          onClose={onClose}
          setValues={setValues}
          success={success}
          setSuccess={setSuccess}
        />
      </Box>
      {user && user.status === 'admin' && (
        <Link className='float' onClick={onOpen}>
          <i className='fa-solid fa-plus my-float'></i>
        </Link>
      )}
    </>
  );
};

export default Staff;
