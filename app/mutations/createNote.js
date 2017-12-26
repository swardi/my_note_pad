
const createNoteMutation = graphql`
  mutation createNoteMutation($input: NoteInput!) {
      createNote(input:$input){
        id
        noteText
        timeStamp
        author
      }
  }
`;

export default createNoteMutation;