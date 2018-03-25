import React, { PropTypes } from 'react'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
  
export default class ExpandableCard extends React.Component {
    constructor(props) {
      super(props);
      this.state = {  
      };
    }

    render() {
        const nodeCards= this.props.nodeMap.map((p,i) => 
        <Card key={i}>
            <CardHeader
              title={p.title}
              actAsExpander={true}
              showExpandableButton={true}
            />
            <CardText expandable={true}>
              <p>{p.minPower}</p>
              <p>{p.maxPower}</p>
            </CardText>
        </Card>)
console.log(this.props);
/*const nodeCards = nodeMap.map(function(object, i){
  return <Card key = {i}>
  <CardHeader
    title={object.title}
    actAsExpander={true}
    showExpandableButton={true}
    key = {i+1}
  />
  <CardText expandable={true} key={i+2}>
    <p>{object.maxPower}</p>
    <p>{object.maxPower}</p>
  </CardText>
</Card>});
*/


        return (
            <div> 
              {nodeCards}
            </div>
        );
    }
  }




