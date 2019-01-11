import React, { Component, Fragment, createRef } from 'react'
import swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import ReactTooltip from 'react-tooltip'

import './css/Interact.css'

const MySwal = withReactContent(swal)

class Interact extends Component {
  mode = createRef()
  player = createRef()
  theme = createRef()

  openAboutSwal = () => {
    MySwal.fire({
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/64/Tic-tac-toe.png',
      imageWidth: 200,
      imageHeight: 200,
      title: 'Tic Tac Boom!',
      text: 'Copyright 2018 Ilham Wahabi',
      confirmButtonText: 'Cool',
      footer: (
        <a 
          class="see-github" rel="noopener noreferrer"
          href="https://github.com/iwgx/tictac-boom" target="_blank"
        >
          See this project on &nbsp;<ion-icon name="logo-github"></ion-icon>
        </a>
      ),
    })
  }

  toggleActiveClass = (ref) => {
    for (let button of [...this[ref].current.childNodes]) {
      button.classList.toggle('active')
    }
  }

  openSettingsSwal = () => {
    let settings = { ...this.props };

    const onSettingsClicked = (key, value) => {
      if (settings[key] !== value) this.toggleActiveClass(key); settings[key] = value;
    }

    MySwal.fire({
      title: 'Game Settings',
      html: (
        <Fragment>
          <div className="options-items" ref={this.mode}>
            <div
              onClick={() => onSettingsClicked('mode', 'human') }
              className={`options-item ${settings.mode === 'human' ? 'active' : ''}`}
            >
              <ion-icon name="contacts"></ion-icon> Human
            </div>
            <div
              onClick={() => onSettingsClicked('mode', 'ai') }
              className={`options-item ${settings.mode === 'ai' ? 'active' : ''}`}
            >
              <ion-icon name="desktop"></ion-icon> AI
            </div>
          </div>
          
          <div className="options-items" ref={this.player}>
            <div
              onClick={() => onSettingsClicked('player', 'cross') } 
              className={`options-item ${settings.player === 'cross' ? 'active' : ''}`}
            >
              <ion-icon name="close"></ion-icon> Cross
            </div>
            <div 
              onClick={() => onSettingsClicked('player', 'circle') }
              className={`options-item ${settings.player === 'circle' ? 'active' : ''}`}
            >
              <ion-icon name="radio-button-off"></ion-icon> Circle
            </div>
          </div>

          <div className="options-items" ref={this.theme}>
            <div 
              onClick={() => onSettingsClicked('theme', 'light') } 
              className={`options-item ${settings.theme === 'light' ? 'active' : ''}`}
            >
              <ion-icon name="sunny"></ion-icon> Light
            </div>
            <div 
              onClick={() => onSettingsClicked('theme', 'dark') } 
              className={`options-item ${settings.theme === 'dark' ? 'active' : ''}`}
            >
              <ion-icon name="moon"></ion-icon> Dark
            </div>
          </div>
        </Fragment>
      ),
      confirmButtonText: 'Save',
      showCancelButton: true,
      cancelButtonText: 'Cancel'
    })
    .then(({value}) => {
      if (!value) return

      this.props.changeSettings('mode', settings.mode)
      this.props.changeSettings('player', settings.player)
      this.props.changeSettings('theme', settings.theme)
    })
  }

  render() {
    return (
      <Fragment>
        <div
          data-tip data-for='settings' className="settings-button" 
          onClick={this.openSettingsSwal}
        >
          <ion-icon name="settings" class="md-48 button-icon"></ion-icon>
        </div>
        <div 
          data-tip data-for='about' className="about-button" 
          onClick={this.openAboutSwal}
        >
          <ion-icon name="happy" class="md-48 button-icon"></ion-icon>
        </div>

        <ReactTooltip
          id='settings' place="right" 
          type='dark' effect="solid"
        >
          Settings
        </ReactTooltip>
        <ReactTooltip
          id='about' place="left"
          type='dark' effect="solid"
        >
          About
        </ReactTooltip>
      </Fragment>
    )
  }
}

export default Interact