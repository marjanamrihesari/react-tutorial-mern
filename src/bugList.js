var React = require('react');
var ReactDom = require('react-dom');
var Link = require('react-router').Link;
var $ = require('jquery');
var BugFilter = require('./bugFilter');
var BugAdd = require('./bugAdd');
var Paper = require('material-ui/lib/paper');
var Table = require('material-ui/lib/table/table');
var TableBody = require('material-ui/lib/table/table-body');
var TableHeader = require('material-ui/lib/table/table-header');
var TableHeaderColumn = require('material-ui/lib/table/table-header-column');
var TableRow = require('material-ui/lib/table/table-row');
var TableRowColumn = require('material-ui/lib/table/table-row-column');
var AppBar = require('material-ui/lib/app-bar');
const style = {
    height: 100,
    width: 100,
    margin: 20,
    textAlign: 'center',
    display: 'inline-block',
};

class BugList extends React.Component {
    constructor() {
        super();
        this.state = { bugs: [] };
        this.addBug = this.addBug.bind(this);
        this.loadData = this.loadData.bind(this);
        this.changeFilter = this.changeFilter.bind(this);

    }
    render() {
        console.log("Rendering BugList, num items:", this.state.bugs.length);
        return (
            <div>
                 <AppBar title="React Bug Tracker" showMenuIconButton={false}/>
                <BugFilter submitHandler={this.changeFilter} initFilter={this.props.location.query} />
                <hr />
                <BugTable bugs={this.state.bugs} />
                <hr />
                <BugAdd addBug={this.addBug} />
            </div>
        );
    }
    componentDidMount() {
        console.log("BugList: componentDidMount");
        this.loadData();
    }
    componentDidUpdate(prevProps) {
        var oldQuery = prevProps.location.query;
        var newQuery = this.props.location.query;
        if (oldQuery.priority === newQuery.priority && oldQuery.status === newQuery.status) {
            console.log("BugList: componentDidUpdate, no change in filter, not updating");
            return;
        } else {
            console.log("BugList: componentDidUpdate, loading data with new filter");
            this.loadData();
        }

    }
    changeFilter(newFilter) {
        this.props.history.push({ search: '?' + $.param(newFilter) });
        this.loadData(newFilter);
    }
    loadData(filter) {
        var query = this.props.location.query || {};
        var filter = { priority: query.priority, status: query.status };
        $.ajax('/api/bugs', { data: filter })
            .done(function (data) {
                this.setState({ bugs: data });
            }.bind(this));
    }
    addBug(bug) {
        console.log("Adding bug:", bug);
        $.ajax({
            type: 'POST', url: '/api/bugs', contentType: 'application/json',
            data: JSON.stringify(bug),
            success: function (data) {
                const bug = data;
                var bugModified = this.state.bugs.concat(bug);
                this.setState({ bugs: bugModified });
            }.bind(this),
            error: function (xhr, status, err) {
                // ideally, show error to user.
                console.log("Error adding bug:", err);
            }
        });
    }
}

class BugTable extends React.Component {
    render() {
        var bugRows = this.props.bugs.map(bug => <BugRow key={bug._id} bug={bug} />);
        //   console.log("Rendering bug table, num items:", this.props.bugs.length);
        return (
            <Paper style={style} zDepth={1} style={{marginTop: 10, marginBottom: 10}}>
                <Table>
                 <TableHeader displaySelectAll={false} adjustForCheckbox={false}>    
                        <TableRow>
                            <TableHeaderColumn style={{width: 180}}>id</TableHeaderColumn>
                            <TableHeaderColumn style={{width: 40}}>status</TableHeaderColumn>
                            <TableHeaderColumn style={{width: 40}}>priority</TableHeaderColumn>
                            <TableHeaderColumn style={{width: 60}}>owner</TableHeaderColumn>
                            <TableHeaderColumn>title</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody stripedRows={true}>
                        {bugRows}
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}
class BugRow extends React.Component {
    render() {
        //    console.log("Rendering BugRow:", this.props.bug);
        var bug= this.props.bug;
        return (
            <TableRow>
                <TableRowColumn style={this.getStyle(180,bug)}>
                    <Link to={`/bugs/${bug._id}`} activeClassName="active">{bug._id}</Link>
                </TableRowColumn>
                <TableRowColumn style={this.getStyle(40,bug)}>{bug.status}</TableRowColumn>
                <TableRowColumn style={this.getStyle(40,bug)}>{bug.priority}</TableRowColumn>
                <TableRowColumn style={this.getStyle(60,bug)}>{bug.owner}</TableRowColumn>
                <TableRowColumn style={this.getStyle(undefined,bug)}>{bug.title}</TableRowColumn>

            </TableRow>
        );
    }
    getStyle(width,bug) {
          let style = {height: 24};
          if (width) style.width = width;
          if (bug.priority == 'P1') style.color = 'red';
         return style;
     }
}
module.exports = BugList;