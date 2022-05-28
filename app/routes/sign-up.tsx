import {
  TextInput,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Button,
  Notification,
} from '@mantine/core';
import { Form, Link, useActionData } from '@remix-run/react';
import type { ActionFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import axios from 'axios';
import type { AdonisError, AdonisErrorItems } from '~/@types/AdonisError';
import FormErrorsList from '~/components/formErrorsList';
import { FiCheck } from 'react-icons/fi';

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()

  const email = formData.get('email')

  try {
    await axios.post('http://localhost:3333/users', { email })

    return json({ accountCreated: true });
  } catch (error) {
    return json({ errors: (error as AdonisError).response.data.errors })
  }
}

export default function SignUp() {
  const actionData = useActionData() as { errors?: AdonisErrorItems[], accountCreated?: boolean }

  return (
    <Container size={420} my={40}>
      <Title
        align="center"
        sx={{ fontWeight: 900 }}
      >
        Create your account
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Already have an account?{' '}
        <Anchor 
          size="sm" 
          to="/login" 
          component={Link} 
        >
          Login
        </Anchor>
      </Text>

      <Form method="post">
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput
            required
            type="email"
            mb="md"
            error={!!actionData?.errors?.find(error => error.field === 'email')}
            name="email"
            label="Email"
            placeholder="you@daedalus.com" 
          />

          <FormErrorsList errors={actionData?.errors} /> 

          <Button type="submit" fullWidth mt={actionData?.errors ? 'md' : ' xl'}>
            Sign up
          </Button>
        </Paper>
      </Form>

      {actionData?.accountCreated && (
        <Notification disallowClose mt="lg" icon={<FiCheck size={18} />} color="teal" title="Account created">
          Check your email to complete your sign up
        </Notification>
      )}
    </Container>
  );
}