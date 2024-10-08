import { usePGlite } from "@electric-sql/pglite-react"
import { useShape } from "@electric-sql/react"
import {
  Checkbox,
  Container,
  Flex,
  Heading,
  Link,
  Text,
  TextField,
} from "@radix-ui/themes"
import { v4 as uuidv4 } from "uuid"

type ToDo = {
  id: string
  title: string
  completed: boolean
  created_at: number
}

export default function Index() {
  const { isUpToDate, data: todos } = useShape<ToDo>({
    url: `http://localhost:3000/v1/shape/todos`,
  })

  todos.sort((a, b) => a.created_at - b.created_at)
  console.log(`TODOs:`, { todos })

  // database stuff
  const db = usePGlite()
  db.exec(`
    CREATE TABLE IF NOT EXISTS todos (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      completed BOOLEAN NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE NOT NULL
    );
    `)

  const insertItem = () => {
    db.query(
      `INSERT INTO todos (id, title, completed, created_at) VALUES($1, $2, false, $3)`,
      [1, `Todo title`, new Date()]
    )
  }

  if (!isUpToDate) {
    return <div>loading</div>
  }

  return (
    <Container size="1">
      <Flex gap="5" mt="5" direction="column">
        <Heading>Electric TODOS</Heading>

        <Flex gap="3" direction="column">
          {todos.map((todo) => {
            return (
              <Flex key={todo.id} gap="2" align="center">
                <Text as="label">
                  <Flex gap="2" align="center">
                    <Checkbox
                      checked={todo.completed}
                      onClick={async () => {
                        console.log(`completed`)
                        await fetch(`http://localhost:3010/todos/${todo.id}`, {
                          method: `PUT`,
                          headers: {
                            "Content-Type": `application/json`,
                          },
                          body: JSON.stringify({
                            completed: !todo.completed,
                          }),
                        })
                      }}
                    />
                    {todo.title}
                  </Flex>
                </Text>
                <Link
                  underline="always"
                  ml="auto"
                  style={{ cursor: `pointer` }}
                  onClick={async () => {
                    console.log(`deleted`)
                    await fetch(`http://localhost:3010/todos/${todo.id}`, {
                      method: `DELETE`,
                    })
                  }}
                >
                  x
                </Link>
              </Flex>
            )
          })}
        </Flex>
        <form
          onSubmit={async (event) => {
            event.preventDefault()
            const id = uuidv4()
            const formData = Object.fromEntries(
              new FormData(event.target as HTMLFormElement)
            )
            const res = await fetch(`http://localhost:3010/todos`, {
              method: `POST`,
              headers: {
                "Content-Type": `application/json`,
              },
              body: JSON.stringify({ id, title: formData.todo }),
            })
            console.log({ res })
          }}
        >
          <TextField.Root type="text" name="todo" placeholder="New Todo" />
        </form>
        <button onClick={insertItem}>Insert to DB</button>
      </Flex>
    </Container>
  )
}
