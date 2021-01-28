import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { useForm } from 'react-hook-form'
import { WithContext as ReactTags } from 'react-tag-input'
import { TagsContainer } from '../styles/tags'

import { EntityFullMetadata, EntityTag } from 'typescript-axios'
import { postEntityMetadata } from '../features/product/tableSlice'

const Input = styled.input`
  flex: 1;
  width: 100%;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  color: #181d23;
  border: 1px solid #c4c4c4;
  box-sizing: border-box;
  border-radius: 4px;
  margin-bottom: 15px;
`

const TextInputGroup = styled.div`
  margin-bottom: 15px;
`

const LargeInput = styled.textarea`
  min-height: 100px;
  width: 100%;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  color: #181d23;
  border: 1px solid #c4c4c4;
  box-sizing: border-box;
  border-radius: 4px;
  margin-bottom: 15px;
`

const Dropdown = styled.select`
  flex: 1;
  width: 100%;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  color: #181d23;
  border: 1px solid #c4c4c4;
  box-sizing: border-box;
  border-radius: 4px;
  background-color: #ffffff;
  margin-left: 10px;
`

const Label = styled.label`
  input[type='radio'] {
    margin-right: 10px;
    transform: scale(1.5);
  }
  font-weight: 500;
`

const FlexLabel = styled(Label)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 1.5rem;
`

const RadioLabel = styled(Label)`
  display: block;
  margin-bottom: 1.5rem;
`

const NewLabel = styled(Label)`
  display: block;
  padding-bottom: 5px;
  font-weight: 400;
`

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  flex-wrap: wrap;
`

const DoneButton = styled.button`
  border-radius: 32px;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  padding: 0.8rem 1rem;
  border: none;
  color: #f8f8f8;
  background: #4d9ef6;
  min-width: 110px;
  margin-left: 10px;
  cursor: pointer;
  outline: none;
`
const CancelButton = styled.button`
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  padding: 0.8rem 1rem;
  border: none;
  background: transparent;
  min-width: 110px;
  margin-left: 10px;
  cursor: pointer;
  outline: none;
`

interface Props {
  close: any
  entities: string[] | null | undefined
  table: string
  index: number
}

export const EntityPopup = ({ close, entities, table, index }: Props) => {
  const [tags, setTags] = useState<
    Array<{
      id: string
      name: string
    }>
  >([])
  const dispatch = useDispatch()

  const { register, errors, handleSubmit } = useForm<FormData>()
  const onSubmit = (data) => {
    let entity: EntityFullMetadata | null = {}
    switch (data.entityRadio) {
      case 'new':
        entity = {
          entity_metadata: {
            name: data.newName,
            title: data.newTitle,
            description: data.newDescription,
          },
          entity_tag_list: tags,
        }
        break
      case 'none':
        entity = null
        break
    }
    dispatch(postEntityMetadata(entity, table, index))
    close()
  }

  const handleDelete = (i) => {
    setTags(tags.filter((tag, index) => index !== i))
  }

  const handleAddition = (tag) => {
    setTags([...tags, tag])
  }

  let renderExistingEntities
  let noEntities = false
  if (entities) {
    renderExistingEntities = entities.map((entity) => (
      <option value={entity} key={entity}>
        {entity}
      </option>
    ))
  } else noEntities = true
  return (
    <div className="modal">
      <button className="close" onClick={close}>
        &times;
      </button>
      <div className="header">New Entity</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="content">
          <FlexLabel>
            <input
              type="radio"
              name="entityRadio"
              value="existing"
              ref={register}
              disabled={noEntities}
            />
            Existing
            <Dropdown
              name="entity"
              id="existingDropdown"
              ref={register}
              disabled={noEntities}
            >
              {renderExistingEntities}
            </Dropdown>
          </FlexLabel>

          <RadioLabel>
            <input type="radio" name="entityRadio" value="new" ref={register} />
            Create New
          </RadioLabel>
          <TextInputGroup>
            <NewLabel>Name</NewLabel>
            <Input type="text" name="newName" ref={register} />
            <NewLabel>Title</NewLabel>
            <Input type="text" name="newTitle" ref={register} />
            <NewLabel>Description</NewLabel>
            <LargeInput name="newDescription" ref={register} />
            <NewLabel>Tags</NewLabel>
            <TagsContainer>
              <ReactTags
                tags={tags}
                handleDelete={handleDelete}
                handleAddition={handleAddition}
                labelField="name"
              />
            </TagsContainer>
          </TextInputGroup>

          <RadioLabel>
            <input
              type="radio"
              name="entityRadio"
              value="none"
              ref={register}
            />
            None
          </RadioLabel>
        </div>
        <ButtonGroup className="actions">
          <CancelButton
            onClick={() => {
              close()
            }}
          >
            Cancel
          </CancelButton>
          <DoneButton name="entitySubmit" type="submit" ref={register}>
            Done
          </DoneButton>
        </ButtonGroup>
      </form>
    </div>
  )
}
