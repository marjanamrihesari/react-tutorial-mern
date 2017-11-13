var React = require('react');
var ReactDOM = require('react-dom');
var RaisedButton = require('material-ui/lib/raised-button');
var Card = require('material-ui/lib/card/card');
var CardHeader = require('material-ui/lib/card/card-header');
var CardText = require('material-ui/lib/card/card-text');
var Avatar = require('material-ui/lib/avatar');
var FontIcon = require('material-ui/lib/font-icon');
var Colors = require('material-ui/lib/styles').Colors;
var TextField = require('material-ui/lib/text-field');

class BugAdd extends React.Component {
    constructor() {
        super();
        this.state = { owner: '', title: '' }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    render() {
        //  console.log("Rendering BugAdd");
        return (
            <Card initiallyExpanded={true}>
                <CardHeader title="Create" subtitle="Add a new Bug."
                    actAsExpander={true} showExpandableButton={true}
                    avatar={
                        <Avatar backgroundColor={Colors.teal500} icon={
                            <FontIcon className="fa fa-plus"></FontIcon>
                        }>
                        </Avatar>
                    }
                />
                <CardText expandable={true} style={{paddingTop: 0}}>
                    <TextField hintText="Owner" value={this.state.owner} onChange={this.onChangeOwner.bind(this)} />
                    <br />
                    <TextField hintText="Title" value={this.state.title} onChange={this.onChangeTitle.bind(this)} />
                    <br />
                    <RaisedButton primary={true} onTouchTap={this.handleSubmit} label="Add Bug" />
                </CardText>
            </Card>
        );
    }
    handleSubmit(event) {
        event.preventDefault();
        this.props.addBug({ owner: this.state.owner, title: this.state.title });
        this.state.owner = "";
        this.state.title = "";
    }
    onChangeTitle(e) {
        this.setState({ title: e.target.value });
    }
    onChangeOwner(e) {
        this.setState({ owner: e.target.value });
    }
}
module.exports = BugAdd;