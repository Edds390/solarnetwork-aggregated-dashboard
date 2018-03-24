import React from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';


const projectMap = [
    {
         title: 'Node 263',
         body: 'Min Power: 288 Watts \n Max Power: 465 Watts'
       },
       {
         title: 'Node 5',
         body: 'Min Power: 288 Watts \n Max Power: 465 Watts'
       },
        {
         
         title: 'Node 135',
         body: 'Min Power: 288 Watts \n Max Power: 465 Watts'
       }
     ] ;
   

export default class CardExampleExpandable extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        selectedNodes: new Set(),
      };
    }

    render() {
    


        const nodeChips=     projectMap.map(p => <Card >
            <CardHeader
              title={p.title}
              actAsExpander={true}
              showExpandableButton={true}
            />
            <CardText expandable={true}>
 <p>
            {p.body} </p>
      <p>      {p.title} </p>
            </CardText>
            </Card>)


        return (
            <div>
         
          
     
          {nodeChips}
        </div>
 
      
    
        );
      }
    }
