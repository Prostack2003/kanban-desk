import { useParams } from 'react-router-dom';
import { BoardWrapper, Column, ColumnTitle, TaskCard } from './Task.styles';

export const Task = () => {
  const {taskId} = useParams()
  console.log(taskId)
  return (
    <BoardWrapper>
      <Column>
        <ColumnTitle>Open</ColumnTitle>
        <TaskCard>
          <p>Задача #1</p>
        </TaskCard>
      </Column>

      <Column>
        <ColumnTitle>In Progress</ColumnTitle>
        <TaskCard>
          <p>Задача #2</p>
        </TaskCard>
      </Column>

      <Column>
        <ColumnTitle>Review</ColumnTitle>
        <TaskCard>
          <p>Задача #3</p>
        </TaskCard>
      </Column>

      <Column>
        <ColumnTitle>Done</ColumnTitle>
        <TaskCard>
          <p>Задача #4</p>
        </TaskCard>
      </Column>


      {/*<button onClick={openCreateTaskModal}>Создать задачу</button>*/}

      {/*{isModalOpen && (*/}
      {/*  <Modal>*/}
      {/*    <form onSubmit={handleCreateTask}>*/}
      {/*      <input type="text" placeholder="Название задачи" required />*/}
      {/*      <textarea placeholder="Описание задачи" required></textarea>*/}
      {/*      <select>*/}
      {/*        <option value="1">Высокий приоритет</option>*/}
      {/*        <option value="2">Средний приоритет</option>*/}
      {/*        <option value="3">Низкий приоритет</option>*/}
      {/*      </select>*/}
      {/*      <button type="submit">ОК</button>*/}
      {/*      <button onClick={closeCreateTaskModal}>Отмена</button>*/}
      {/*    </form>*/}
      {/*  </Modal>*/}
      {/*)}*/}
    </BoardWrapper>

  )
}
