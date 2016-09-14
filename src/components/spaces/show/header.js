import React, {Component} from 'react'

import Icon from 'react-fa'

import {PrivacyToggle} from './privacy-toggle/index'
import {SpaceName} from './spaceName'

import e from 'gEngine/engine'

import './header.css'

export class SpaceHeader extends Component {
  componentDidMount() { window.recorder.recordMountEvent(this) }
  componentWillUpdate() { window.recorder.recordRenderStartEvent(this) }
  componentDidUpdate() { window.recorder.recordRenderStopEvent(this) }
  componentWillUnmount() { window.recorder.recordUnmountEvent(this) }

  shouldComponentUpdate(nextProps, nextState) {
    if (!nextProps.editableByMe) { return false }

    return (
      this.props.name !== nextProps.name ||
      this.props.isPrivate !== nextProps.isPrivate ||
      this.props.editableByMe !== nextProps.editableByMe ||
      this.props.shareableLinkUrl !== nextProps.shareableLinkUrl
    )
  }

  render() {
    const {
      canBePrivate,
      name,
      ownerName,
      ownerPicture,
      ownerUrl,
      ownerIsOrg,
      isPrivate,
      editableByMe,
      shareableLinkUrl,
      onPublicSelect,
      onPrivateSelect,
      onSaveName,
      onEnableShareableLink,
      onDisableShareableLink,
      onRotateShareableLink,
    } = this.props

    let privacy_header = (<span><Icon name='globe'/> Public</span>)
    if (isPrivate) {
      privacy_header = (<span><Icon name='lock'/> Private</span>)
    }

    return (
      <div className='container-fluid'>
        <div className='row header'>
          <div className='col-md-8 col-xs-6'>
            <div className='header-name'>
              <SpaceName
                  name={name}
                  editableByMe={editableByMe}
                  onSave={onSaveName}
              />
            </div>
          </div>

          <div className='col-md-4 col-xs-6'>
            {(ownerIsOrg || !editableByMe)  &&
              <a className='ui image label' href={ownerUrl}>
                <img src={ownerPicture}/>
                {ownerName}
              </a>
            }
            {(isPrivate || editableByMe) &&
              <PrivacyToggle
                editableByMe={editableByMe}
                openLink={<a className='space-header-action'>{privacy_header}</a>}
                isPrivateSelectionInvalid={!canBePrivate}
                isPrivate={isPrivate}
                shareableLinkUrl={shareableLinkUrl}
                onPublicSelect={onPublicSelect}
                onPrivateSelect={onPrivateSelect}
                onEnableShareableLink={onEnableShareableLink}
                onDisableShareableLink={onDisableShareableLink}
                onRotateShareableLink={onRotateShareableLink}
              />
            }
          </div>
        </div>
      </div>
    )
  }
}
