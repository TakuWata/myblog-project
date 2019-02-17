import React from 'react';
import { connect } from 'react-redux';
import { fetchSearchResults } from '../actions';


class SearchResult extends React.Component{
    // async componentDidMount(){
    //     await console.log('term in search result', this.props.term)
        
    //     const response = await fetchSearchResults(this.props.term);
    //     console.log('response', response.data)
        
    //     // 1. SearchBarでsubmitされた時 '/resuts’へリンクするコードをかく
    //     // 2. 結果がない場合は、結果がないというテキストをリターン、ある場合は結果をリターンというコードを書く
    // }

    // componentDidMount(){
    //     const { dispatch } = this.props;
    //     //dispatch(fetchSearchResults());
    // }

    componentDidUpdate(){
        console.log('search', this.props.search)
    }

    render(){
        const term = this.props.search
        console.log('results in search result', term)
        const results = fetchSearchResults(term)
        console.log(results)
        const renderedList = this.props.results.map (result => {
            return (
                <a key={result.id}> className="item" href={`/posts/${result.id}`}
                    {result.title}
                </a>
            );
        });

        return(
            <div>
                { this.props.results.length === 0 ? "Nothig to show" : renderedList }
            </div>
        )
    }
}


// class SearchResult extends React.Component{
//     componentDidMount(){
//         this.props.fetchSearchResults(this.props.term);
//     };

//     render(){
//         if (this.props.results){
//             const ResultList = this.props.results.map (result => {
//                 if (result){
//                     return (
//                         <a key={result.id} className="item" href={`/posts/${result.id}`}>
//                             {result.title}
//                         </a>
//                     );
//                 }
//             })
//         } else {
//             const ResultList = [];
//             return ResultList;
//         }
//         return (
//             <h4 className="ui container">
//                 <div className="ui link list">
//                     {ResultList}
//                 </div>
//             </h4>
//         );
//     };
// }

const mapStateToProps = (state) => {
    return { results: state.searchResults, search: state.search }
}

export default connect(
    mapStateToProps,
    { fetchSearchResults }
)(SearchResult);