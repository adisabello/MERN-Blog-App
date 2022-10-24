import {useQuery} from '@apollo/client'
import PostList from './Components/PostList';

function App() {

  return (
    <div className="app">
       <header>
         <h1>Code_Blog</h1>
       </header>
       <PostList />
    </div>
  );
}

export default App;
