import {
  Text,
  Paper,
  Title,
  Group,
  Anchor,
  Button,
  TextInput,
  Container,
  PasswordInput,
} from '@mantine/core';
import { Form, Link, useActionData } from '@remix-run/react';
import type { ActionFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { commitAuthSession, getAuthSession } from '~/cookies/auth.cookie';
import axios from 'axios';
import type { AdonisError, AdonisErrorItems } from '~/@types/AdonisError';
import FormErrorsList from '~/components/formErrorsList';

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()

  const email = formData.get('email')
  const password = formData.get('password')

  try {
    const { data } = await axios.post('http://localhost:3333/login', { email, password })

    const authSession = await getAuthSession(
      request.headers.get("Cookie")
    );
  
    authSession.set('user', data)
  
    return redirect('/dashboard', {
      headers: {
        "Set-Cookie": await commitAuthSession(authSession),
      },
    });
  } catch (error) {
    return json({ errors: (error as AdonisError).response.data.errors })
  }
}

export default function Login() {
  const actionData = useActionData() as { errors?: AdonisErrorItems[] }

  return (
    <Container size={420} my={40}>
      <Title
        align="center"
        sx={{ fontWeight: 900 }}
      >
        Welcome back!
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Do not have an account yet?{' '}
        <Anchor 
          size="sm" 
          to="/sign-up" 
          component={Link} 
        >
          Create account
        </Anchor>
      </Text>

      <Form method="post">
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput
            type="email"
            required
            error={!!actionData?.errors?.find(error => error.field === 'email')}
            name="email"
            label="Email"
            placeholder="you@daedalus.com" 
          />

          <PasswordInput 
            required
            error={!!actionData?.errors?.find(error => error.field === 'password')}
            name="password"
            label="Password"
            placeholder="Your password"
            mt="md"
            mb="lg"
          />

          <FormErrorsList errors={actionData?.errors} /> 

          <Group position="apart" mt={actionData?.errors ? '-8px' : ' md'} sx={{ justifyContent: 'center'}}>
            <Button type="submit" fullWidth mt="xl">
              Sign in
            </Button>

            <Anchor size="sm" component={Link} to="/forgot-password">
              Forgot password?
            </Anchor>
          </Group>
        </Paper>
      </Form>
    </Container>
  );
}