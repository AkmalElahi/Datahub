import styled from 'styled-components'

export const TagsContainer = styled.div`
  .ReactTags__tags {
    position: relative;
  }

  /* Styles for the input */
  .ReactTags__tagInput {
    width: 100%;
    border-radius: 2px;
    display: inline-block;
  }
  .ReactTags__tagInput input.ReactTags__tagInputField,
  .ReactTags__tagInput input.ReactTags__tagInputField:focus {
    height: 31px;
    margin: 0;
    font-size: 1rem;
    width: 100%;
    border: 1px solid #c4c4c4;
    padding: 0.375rem 0.75rem;
  }

  /* Styles for selected tags */
  .ReactTags__selected span.ReactTags__tag {
    border: 1px solid #ddd;
    background: #eee;
    font-size: 12px;
    display: inline-block;
    padding: 5px;
    margin: 0 5px;
    border-radius: 2px;
  }
  .ReactTags__selected a.ReactTags__remove {
    color: #aaa;
    margin-left: 5px;
    cursor: pointer;
  }

  /* Styles for suggestions */
  .ReactTags__suggestions {
    position: absolute;
  }
  .ReactTags__suggestions ul {
    list-style-type: none;
    box-shadow: 0.05em 0.01em 0.5em rgba(0, 0, 0, 0.2);
    background: white;
    width: 200px;
  }
  .ReactTags__suggestions li {
    border-bottom: 1px solid #ddd;
    padding: 5px 10px;
    margin: 0;
  }
  .ReactTags__suggestions li mark {
    text-decoration: underline;
    background: none;
    font-weight: 600;
  }
  .ReactTags__suggestions ul li.ReactTags__activeSuggestion {
    background: #b7cfe0;
    cursor: pointer;
  }

  .ReactTags__remove {
    border: none;
    cursor: pointer;
    background: none;
  }
`
