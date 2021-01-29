import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { useForm, Controller } from 'react-hook-form'
import { useDropzone } from 'react-dropzone'
import { createProduct } from '../features/product/productSlice'

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #fafafa;

  border: 1px dashed #c4c4c4;
  border-radius: 4px;
  transition: border 0.24s ease-in-out;
`

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
const InlineInput = styled(Input)`
  margin-bottom: 0;
  margin-left: 10px;
`

const TextInputGroup = styled.div`
  margin-bottom: 15px;
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

const ViewsLabel = styled(Label)`
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

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  align-items: center;
  padding: 2rem 0;
`

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 100%;
  justify-content: flex-start;
  flex: 1;
`

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 100%;
  justify-content: flex-start;
  flex: 2;
`

interface Props {
  close: any
  addType: 'product' | 'table'
}

const Dropzone = (props) => {
  const { onChange } = props
  const {
    acceptedFiles,
    fileRejections,
    getRootProps,
    getInputProps,
  } = useDropzone({
    accept: '.csv',
  })

  const acceptedFileItem = acceptedFiles.map((file) => (
    <div>
      {(file as any).path} - {file.size} bytes
    </div>
  ))

  return (
    <Container {...getRootProps()}>
      <input {...getInputProps({ onChange })} />
      <p>Drag & drop file here, or click to select file</p>
      <aside>
        <p>{acceptedFileItem}</p>
      </aside>
    </Container>
  )
}

export const DataSourcePopup = ({ close, addType }: Props) => {
  const dispatch = useDispatch()

  const { control, register, errors, handleSubmit } = useForm<FormData>()
  const onSubmit = (data) => {
    console.log(data)
    const formData = new FormData()
    formData.append('file', data.file)
    //dispatch(createProduct(data.productName, data.tableName, data.fileRadio.value, data.addViews ? 'true' : 'false', ))
  }

  return (
    <div className="modal">
      <button className="close" onClick={close}>
        &times;
      </button>
      <div className="header">Add Data Source</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="content">
          <TextInputGroup>
            {addType === 'product' && <NewLabel>Product Name</NewLabel>}
            <Input type="text" name="productName" ref={register} />
            <NewLabel>Table Name</NewLabel>
            <Input type="text" name="tableName" ref={register} />
          </TextInputGroup>
          <NewLabel>CSV File</NewLabel>
          <FlexLabel>
            <input type="radio" name="fileRadio" value="link" ref={register} />
            Link
            <InlineInput name="newLink" ref={register} />
          </FlexLabel>
          <RadioLabel>
            <input
              type="radio"
              name="fileRadio"
              value="upload"
              ref={register}
            />
            Upload
          </RadioLabel>
          <Controller
            name="file"
            control={control}
            render={({ onChange }) => <Dropzone onChange={onChange} />}
          />
        </div>

        <FlexRow>
          <LeftColumn>
            <ViewsLabel>
              <input
                type="checkbox"
                name="addViews"
                style={{ marginRight: '10px' }}
                ref={register}
                checked
              />
              Add views
            </ViewsLabel>
          </LeftColumn>
          <RightColumn>
            <ButtonGroup className="actions">
              <CancelButton
                onClick={() => {
                  close()
                }}
              >
                Cancel
              </CancelButton>
              <DoneButton name="entitySubmit" type="submit" ref={register}>
                Upload
              </DoneButton>
            </ButtonGroup>
          </RightColumn>
        </FlexRow>
      </form>
    </div>
  )
}
