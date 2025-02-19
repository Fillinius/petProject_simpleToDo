import { useCallback, useMemo, useState } from 'react'
import './App.css'
import { Flex, Layout, Input, Checkbox, List, Button, Radio } from 'antd'

interface ITodo {
  id: number
  title: string
  checked: boolean
}
type Filter = 'all' | 'checked' | 'unckecked'

function App() {
  const [todos, setTodos] = useState<ITodo[]>([])
  const [filter, setFilter] = useState<Filter>('all')
  const [input, setInput] = useState('')
  const optionsFilter: { [key in Filter]: string } = {
    all: 'Все',
    checked: 'Выполнен',
    unckecked: 'Не выполнен',
  }

  const addTodo = useCallback(() => {
    if (input.trim()) {
      const newTodo: ITodo = {
        id: Date.now(),
        title: input.trim(),
        checked: false,
      }
      setTodos((prev) => [...prev, newTodo])
      setInput('')
    }
  }, [input])

  const chekedItem = useCallback((id: ITodo['id']) => {
    setTodos((prev) =>
      prev.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            checked: !todo.checked,
          }
        }
        return todo
      })
    )
  }, [])

  const deleteItem = useCallback(
    (id: ITodo['id']) =>
      setTodos((prev) => prev.filter((todo) => todo.id !== id)),
    []
  )

  const filterTodo = useMemo(
    () =>
      todos.filter((todo) => {
        if (filter === 'checked') {
          return todo.checked
        } else if (filter === 'unckecked') {
          return !todo.checked
        } else {
          return todo
        }
      }),
    [filter, todos]
  )

  const { Header, Content } = Layout

  const headerStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#fff',
    minHeight: `7em`,
    paddingInline: 48,
    lineHeight: '64px',
    backgroundColor: '#4096ff',
    paddingTop: `10px`,
  }

  const contentStyle: React.CSSProperties = {
    color: '#fff',
    backgroundColor: '#0958d9',
  }

  const layoutStyle = {
    borderRadius: 8,
    overflow: 'hidden',
    width: `40em`,
  }

  return (
    <>
      <h1>Vite + React</h1>

      <Flex gap="middle" wrap>
        <Layout style={layoutStyle}>
          <Header style={headerStyle}>
            <Flex gap="middle" align="start" justify="space-between">
              <Input
                placeholder="Title"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <Button onClick={addTodo} disabled={input.trim() == ''}>
                Add
              </Button>
            </Flex>

            <Radio.Group
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              defaultValue="all"
            >
              {Object.entries(optionsFilter).map(([value, label]) => (
                <Radio.Button key={value} value={value}>
                  {label}
                </Radio.Button>
              ))}
            </Radio.Group>
          </Header>
          <Content style={contentStyle}>
            <List
              size="large"
              bordered
              dataSource={filterTodo}
              renderItem={(todo) => (
                <List.Item
                  key={todo.id}
                  actions={[
                    <Button onClick={() => deleteItem(todo.id)}>Del</Button>,
                  ]}
                >
                  <Checkbox
                    checked={todo.checked}
                    onChange={() => chekedItem(todo.id)}
                  >
                    {todo.title}
                  </Checkbox>
                </List.Item>
              )}
            />
          </Content>
        </Layout>
      </Flex>
    </>
  )
}

export default App
