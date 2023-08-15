// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// function App() {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     async function fetchData() {
//       const response = await axios.post('http://localhost:3030/alluniversity/query',null, {
//         headers: {},
//         params: {query: `PREFIX table: <http://www.semanticweb.org/budcoded/ontologies/university/all#>
//         SELECT DISTINCT ?subject  WHERE { ?subject table:Hires ?object .}`}
//       });
//       setData(response.data.results.bindings);
//     }
//     fetchData();
//   }, []);

//   return (
//     <div>
//       {/* <web /> */}
//       <h1>Data from Fuseki Server:</h1>
//       <table>
//         <thead>
//           <tr>
//             <th>Subject</th>
//             {/* <th>Object</th> */}
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((row, index) => (
//             <tr key={index}>
//               <td>{row.subject.value.split("#")[1]}</td>
//               <button>info</button>
//               {/* <td>{row.object.value}</td> */}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }
// export default App;

//  const url = "http://www.semanticweb.org/budcoded/ontologies/university/iiitb#iiitb";
// const [, fragment] = url.split("#");

// console.log(fragment); // "iiitb"

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AnotherComponent from  './AnotherComponent';
import './App.css';


function App() {
  const [data, setData] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');

  useEffect(() => {
    async function fetchData() {
      const response = await axios.post('http://localhost:3030/univ_all_combined/query',null, {
        headers: {},
        params: {query: `PREFIX table: <http://www.semanticweb.org/budcoded/ontologies/university/all#>
        SELECT DISTINCT ?subject  WHERE { ?subject table:Hires ?object .}`}
      });
      setData(response.data.results.bindings);
    }
    fetchData();
  }, []);

  // Create an array of options for the dropdown menu
  const options = data.map((row, index) => ({
    value: row.subject.value.split("#")[1],
    label: row.subject.value.split("#")[1]
  }));

  // Handle the dropdown change event
  const handleDropdownChange = (event) => {
    setSelectedOption(event.target.value);
  };

  // Render the component based on the selected option
  let content;
  if (selectedOption) {
    content = <AnotherComponent option={selectedOption} />;
  }

  return (
    <div>
      <div className="dropdown">
      <select onChange={handleDropdownChange}>
        <option value="">Select an University</option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      </div>
      <div className="content">
      {content}
      </div>
    </div>
  );
}

export default App;

