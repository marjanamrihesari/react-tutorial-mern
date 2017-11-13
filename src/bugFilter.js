var React = require('react');
var ReactDOM = require('react-dom');
var RaisedButton = require('material-ui/lib/raised-button');
var Card = require('material-ui/lib/card/card');
var CardHeader = require('material-ui/lib/card/card-header');
var CardText = require('material-ui/lib/card/card-text');
var SelectField = require('material-ui/lib/select-field');
var MenuItem = require('material-ui/lib/menus/menu-item');
var Avatar = require('material-ui/lib/avatar');
var FontIcon = require('material-ui/lib/font-icon');
var Colors = require('material-ui/lib/styles').Colors;
var anyValue = '*';


class BugFilter extends React.Component {
    constructor(props) {
        super(props);
        let initFilter = this.props.initFilter;
        this.state = {
            priority: initFilter.priority || anyValue,
            status: initFilter.status || anyValue
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {
        console.log("Rendering BugFilter, state=", this.state);
        return (
            <Card initiallyExpanded={true}>
                <CardHeader title="Filter" subtitle="Show a subset of records"
                    actAsExpander={true} showExpandableButton={true}
                    avatar={
                        <Avatar backgroundColor={Colors.teal500} icon={
                            <FontIcon className="fa fa-filter"></FontIcon>
                        }>
                        </Avatar>
                    }
                />
                <CardText expandable={true} style={{ paddingTop: 0 }}>
                    <SelectField value={this.state.status} onChange={this.onChangeStatus.bind(this)}
                        floatingLabelText="Status">
                        <MenuItem value={anyValue} primaryText="(Any)" />
                        <MenuItem value="New" primaryText="New" />
                        <MenuItem value="Open" primaryText="Open" />
                        <MenuItem value="Closed" primaryText="Closed" />
                    </SelectField>
                    &nbsp;
                        <SelectField value={this.state.priority} onChange={this.onChangePriority.bind(this)}
                        floatingLabelText="Priority">
                        <MenuItem value={anyValue} primaryText="(Any)" />
                        <MenuItem value="P1" primaryText="P1" />
                        <MenuItem value="P2" primaryText="P2" />
                        <MenuItem value="P3" primaryText="P3" />
                    </SelectField>
                    <br />
                    <RaisedButton primary={true} onTouchTap={this.handleSubmit} label="Filter" />
                </CardText>
            </Card>
        );
    }

    componentWillReceiveProps(newProps) {
        var newFilter = {
            status: newProps.initFilter.status || anyValue,
            priority: newProps.initFilter.priority || anyValue
        };
        if (newFilter.status === this.state.status
            && newFilter.priority === this.state.priority) {
            console.log("BugFilter: componentWillReceiveProps, no change");
            return;
        }
        console.log("BugFilter: componentWillReceiveProps, new filter:", newProps.initFilter);
        this.setState({ status: newProps.initFilter.status, priority: newProps.initFilter.priority });

    }

    onChangeStatus(e, index, value) {
        this.setState({ status: value });
    }
    onChangePriority(e, index, value) {
        this.setState({ priority: value });
    }
    handleSubmit(event) {
        var newFilter = {};
        if (this.state.priority != anyValue) newFilter.priority = this.state.priority;
        if (this.state.status != anyValue) newFilter.status = this.state.status;
        this.props.submitHandler(newFilter);
    }
}
module.exports = BugFilter;