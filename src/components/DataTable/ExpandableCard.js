import React from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';


const nodeMap = [
    {
         title: 'Node 263',
         minPower: 'Min Power: 288 Watts',
         maxPower: 'Max Power: 465 Watts'
        },
       {
         title: 'Node 5',
         minPower: 'Min Power: 123 Watts',
         maxPower: 'Max Power: 354 Watts'     
       },
        {
         title: 'Node 135',
         minPower: 'Min Power: 7 Watts',
         maxPower: 'Max Power: 45 Watts'       
       }
     ] ;
  
export default class ExpandableCard extends React.Component {
    constructor(props) {
      super(props);
      this.state = {  
      };
    }

    render() {
        const nodeCards= nodeMap.map(p => 
        <Card>
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

        return (
            <div> 
              {nodeCards}
            </div>
        );
    }
  }
