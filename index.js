import React from 'react'
import ReactDOM from 'react-dom'

const projectList = [
  {
    name: 'item1',
    attrib1: 'a',
    attrib2: 'b',
    attrib3: 'c',
  },
  {
    name: 'item2',
    attrib1: 'a',
    attrib2: 'd',
    attrib3: 'e',
  },
  {
    name: 'item3',
    attrib1: 'f',
    attrib2: 'd',
    attrib3: 'e',
  },
]

class InnerCard extends React.Component {
  render() {
    return (
      <div>
        {this.props.items.map((value, index) => {
          return (
            <div key={index} className="container-fluid pt-3">
              <div className="items border border-light">
                <div className="card draggable shadow-sm">
                  <div className="card-body p-2 ">
                    <div className="card-title" />
                    <div>{value.name}</div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    )
  }
}

class OuterCard extends React.Component {
  constructor() {
    super()
    this.state = {
      filter: 'attrib1',
    }
  }

  handleFilterOnChange = e => {
    this.setState({
      filter: e.currentTarget.value,
    })
  }

  render() {
    const kbList = projectList.reduce((previous, current) => {
      if (previous[current[this.state.filter]] === undefined) {
        previous[current[this.state.filter]] = []
      }

      previous[current[this.state.filter]].push(current)

      return previous
    }, {})

    return (
      <div>
        <select onChange={this.handleFilterOnChange}>
          <option value="attrib1">attrib1</option>
          <option value="attrib2">attrib2</option>
          <option value="attrib3">attrib3</option>
        </select>
        {Object.keys(kbList).map((value, index) => {
          return (
            <div key={index} className="container-fluid pt-3">
              <div className="row flex-row flex-sm-nowrap py-3">
                <div className="col-sm-6 col-md-4 col-xl-3">
                  <div className="card bg-light">
                    <div className="card-body">
                      <h6 className="card-title text-uppercase text-truncate py-2">
                        <div>{value}</div>
                      </h6>
                      <InnerCard items={kbList[value]} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    )
  }
}

ReactDOM.render(<OuterCard />, document.getElementById('root'))
