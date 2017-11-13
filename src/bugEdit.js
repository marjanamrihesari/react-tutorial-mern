var React = require('react');
var Link = require('react-router').Link;
var $ = require('jquery');
var RaisedButton = require('material-ui/lib/raised-button');
var FlatButton = require('material-ui/lib/flat-button');
var Card = require('material-ui/lib/card/card');
var CardHeader = require('material-ui/lib/card/card-header');
var CardText = require('material-ui/lib/card/card-text');
var SelectField = require('material-ui/lib/select-field');
var TextField = require('material-ui/lib/text-field');
var MenuItem = require('material-ui/lib/menus/menu-item');
var Avatar = require('material-ui/lib/avatar');
var FontIcon = require('material-ui/lib/font-icon');
var Colors = require('material-ui/lib/styles').Colors;
var Snackbar = require('material-ui/lib/snackbar');
var anyValue = '*';

class BugEdit extends React.Component {
    constructor() {
        super();
        this.state = {
            open: false
        };
    }

    render() {
        return (
            <Card style={{maxWidth: 800}}>
                <CardHeader title="Edit bug:" subtitle={this.props.params.id}
                    avatar={
                        <Avatar backgroundColor={Colors.teal500} icon={
                            <FontIcon className="fa fa-filter"></FontIcon>
                        }>
                        </Avatar>
                    }
                />
                <CardText>
                    <SelectField  fullWidth={true} value={this.state.status} onChange={this.onChangeStatus.bind(this)}
                        floatingLabelText="Status">
                        <MenuItem value={anyValue} primaryText="(Any)" />
                        <MenuItem value="New" primaryText="New" />
                        <MenuItem value="Open" primaryText="Open" />
                        <MenuItem value="Closed" primaryText="Closed" />
                    </SelectField>
                    &nbsp;
                    <SelectField  fullWidth={true} value={this.state.priority} onChange={this.onChangePriority.bind(this)}
                        floatingLabelText="Priority">
                        <MenuItem value={anyValue} primaryText="(Any)" />
                        <MenuItem value="P1" primaryText="P1" />
                        <MenuItem value="P2" primaryText="P2" />
                        <MenuItem value="P3" primaryText="P3" />
                    </SelectField>
                    <br />
                    <TextField  fullWidth={true} floatingLabelText="Owner" value={this.state.owner} onChange={this.onChangeOwner.bind(this)} />
                    <br />
                    <TextField  fullWidth={true} floatingLabelText="Bug Title" multiLine={true} value={this.state.title} onChange={this.onChangeTitle.bind(this)} />
                    <br />
                    <RaisedButton onTouchTap={this.submit.bind(this)} label="Update Bug" />
                    <FlatButton label="Back to Bug List" linkButton={true} href="/#/bugs"  style={{verticalAlign: 'top'}}/>
                    <Snackbar
                        open={this.state.open}
                        message='Bug is updated successfully.THANK YOU!'
                        autoHideDuration={4000}
                        onRequestClose={this.closeMessage.bind(this)}
                        action="ok" 
                        onActionTouchTap={this.showMessage.bind(this)}
                    />
                </CardText>
            </Card>
        );
    }

    componentDidMount() {
        this.loadData();
        console.log(this.state);
    }
    componentDidUpdate(prevProps) {
        console.log("BugEdit: componentDidUpdate", prevProps.params.id, this.props.params.id);
        if (this.props.params.id != prevProps.params.id) {
            console.log("BugEdit: componentDidUpdatev: is changed")
            this.loadData();
        }
    }
    onChangeStatus(e, index, value) {
        this.setState({ status: value });
    }
    onChangePriority(e, index, value) {
        this.setState({ priority: value });
    }
    onChangeTitle(e) {
        this.setState({ title: e.target.value });
    }
    onChangeOwner(e) {
        this.setState({ owner: e.target.value });
    }
    showMessage() {
        this.setState({  open: true});
    }
    
    closeMessage() {
        this.setState({  open: false});
    }
    loadData() {
        $.ajax('/api/bugs/' + this.props.params.id)
            .done(function (data) {
                console.log(data);
                this.setState(data);
            }.bind(this));
    }
    submit(event) {
        event.preventDefault();
        var bug = {
            status: this.state.status,
            priority: this.state.priority,
            owner: this.state.owner,
            title: this.state.title,
            _id: this.state._id
        }
        console.log(bug);
        $.ajax({
            url: '/api/bugs/' + this.props.params.id, type: 'PUT', contentType: 'application/json',
            data: JSON.stringify(bug),
            dataType: 'json',
            success: function (bug) {
                this.setState(bug);
                this.showMessage();
            }.bind(this),
        });
    }
}
module.exports = BugEdit;