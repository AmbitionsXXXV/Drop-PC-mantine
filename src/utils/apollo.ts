import { currentOrg } from '@/utils'
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error' // 引入onError
import { notifications } from '@mantine/notifications'
import { AUTH_TOKEN } from './constants'

const uri = '/graphql'

const httpLink = createHttpLink({
  uri
})

const authLink = setContext((_, { headers }) => {
  const token = sessionStorage.getItem(AUTH_TOKEN) || localStorage.getItem(AUTH_TOKEN)
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
      orgId: currentOrg()?.value
    }
  }
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    notifications.show({
      color: 'red',
      title: '请求参数或者返回的数据格式不对',
      message: 'Hey there, your code is awesome! 🤥'
    })

    graphQLErrors.forEach((item) => {
      if (item.message === 'Unauthorized') {
        notifications.show({
          color: 'red',
          title: '登录失效，请登录',
          message: 'Hey there, your code is awesome! 🤥'
        })
      }
    })
  }

  if (networkError) {
    notifications.show({
      color: 'red',
      title: networkError.message,
      message: 'Hey there, your code is awesome! 🤥'
    })
  }
})

export const client = new ApolloClient({
  link: errorLink.concat(authLink.concat(httpLink)),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache'
    }
  },
  cache: new InMemoryCache({
    addTypename: false
  })
})
