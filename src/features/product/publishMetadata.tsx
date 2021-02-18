import React from 'react'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'

import { ProductMetadata, ViewMetadata } from '../../gen/api/api'

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
`

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 100%;
  flex: 1;
`

const UList = styled.ul`
  list-style-type: none;
  margin: 0;
  margin-bottom: 10px;
  padding-inline-start: 0;
`

const List = styled.li`
  display: flex;
`

const Label = styled.label`
  border: 1px solid rgba(196, 196, 196, 0.5);
  border-right: none;
  box-sizing: border-box;
  border-radius: 6px 0 0 6px;
  padding: 16px 20px;
`

const Input = styled.input`
  flex: 1;
  width: 100%;
  padding: 0.375rem 0.75rem;
  background-color: #f8f8f8;
  font-size: 1rem;
  color: #181d23;
  border: 1px solid rgba(196, 196, 196, 0.5);
  box-sizing: border-box;
  border-radius: 0 6px 6px 0;
`

const Dropdown = styled.select`
  flex: 1;
  width: 100%;
  padding: 0.375rem 0.75rem;
  background-color: #f8f8f8;
  font-size: 1rem;
  color: #181d23;
  border: 1px solid rgba(196, 196, 196, 0.5);
  box-sizing: border-box;
  border-radius: 0 6px 6px 0;
`
const UploadButton = styled.span`
border-radius: 10px;
font-style: normal;
font-weight: bold;
font-size: 16px;
line-height: 24px;
text-align: center;
padding: 0.8rem 1rem;
border:1px solid lightgrey;
cursor: pointer;
background-color:#ffffff;
position:relative
`
interface Props {
  metadata: ProductMetadata | undefined
  homeCandidates: ViewMetadata[] | undefined
  register: ReturnType<typeof useForm>['register']
  errors: ReturnType<typeof useForm>['errors']
  image_public_link: string | null | undefined,
  uploadFile: (file: any) => void
}

//type InputEvent = ChangeEvent<HTMLInputElement>
//type ChangeHandler = (event: InputEvent) => void

export const PublishMetadataSection = ({
  metadata,
  homeCandidates,
  register,
  errors,
  image_public_link,
  uploadFile
}: Props) => {
  //const [currentKey, setCurrentKey] = useState('0')

  //const handleChange: ChangeHandler = event => {
  //  setCurrentKey(event.target.value)
  //}

  let renderedViews = homeCandidates?.map((c) => (
    <option value={c.name || ''} key={c.name} selected={c.name === metadata?.home_page_view_name}>
      {c.name}
    </option>
  ))
  return (
    <React.Fragment>
      <h1>Product</h1>
      <FlexRow>
        <FlexColumn style={{ marginRight: '10px' }}>
          <UList>
            <List>
              <Label>Name</Label>
              <Input value={metadata?.name || ''} disabled />
            </List>
          </UList>
        </FlexColumn>
        <FlexColumn>
          <UList>
            <List>
              <Label>Title</Label>
              <Input
                name="title"
                key={metadata?.title}
                defaultValue={metadata?.title || ''}
                ref={register}
              />
              {errors.title}
            </List>
          </UList>
        </FlexColumn>
      </FlexRow>
      <FlexRow>
        <UList style={{ width: '100%' }}>
          <List>
            <Label>Description</Label>
            <Input
              name="description"
              key={metadata?.description}
              defaultValue={metadata?.description || ''}
              ref={register}
            />
            {errors.description}
          </List>
        </UList>
      </FlexRow>
      <FlexRow>
        <UList style={{ width: '100%' }}>
          <List>
            <Label>Home Page View</Label>
            <Dropdown
              name="candidates"
              id="candidates"
              defaultValue={
                homeCandidates ? homeCandidates[0].toString() : 'none'
              }
            >
              {renderedViews}
            </Dropdown>
          </List>
        </UList>
      </FlexRow>
      <FlexRow>
        <FlexColumn style={{ marginRight: '10px', flex: '4' }}>
          <UList>
            <List>
              <Label>Header Image URL</Label>
              <Input defaultValue={image_public_link || metadata?.header_image_url || ''} />
            </List>
          </UList>
        </FlexColumn>
        <FlexColumn>
          <UploadButton ><input onChange={(e) => uploadFile(e.target.files?.[0])} type="file" style={{ opacity: 0, position: 'absolute', left: 0, right: 0, height: "100%", width: "100%" }} /><label>Upload Image</label></UploadButton>
        </FlexColumn>
      </FlexRow>
    </React.Fragment>
  )
}
