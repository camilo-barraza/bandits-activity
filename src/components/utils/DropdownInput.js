import React, { useState } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'

const Wrapper = styled.div`
  z-index: 1000;
  position: relative;
`

const DropdownDiv = styled.div`
  background-color: white;
  border: solid 1px #5F6368;
  position: absolute;
  box-shadow: 0 2px 10px 0 rgba(14, 72, 141, 0.04);
  border-radius: 4px;
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  -ms-border-radius: 4px;
  -o-border-radius: 4px;
  max-height:250px;
  overflow-y:scroll;
`

const DropdownButton = styled.div`
  outline: none;
  color: #5F6368;
`

const Input = styled.div`
	box-sizing: border-box;
  height: 32px;
  font-weight: bold;
  font-size: 14px;
  width: 100%;
	border: 1px solid #5F6368;
  border-radius:2px;
  background-color: white ;
  :hover{
    cursor:pointer;
    opacity:0.8;
  }
`

const MenuItem = styled.div`
  font-size: 14px;
  height:35px;
  user-select: none;
  :hover{
    cursor:pointer;
    color:#1F78B4;
  }
`

const DropdownInput = ({ menu, value, onChange }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const onBlur = (evt) => { setDropdownOpen(false) }

  const onSelectItem = (index) => {
    onChange(menu[index])
    setDropdownOpen(false)
  }

  return (<div>
    <DropdownButton tabIndex={0} onBlur={onBlur} className='w-100'>
      <div onClick={() => setDropdownOpen(true)} className='navigation-bar__profile-icon d-flex align-items-center justify-content-center'>
        <Input className='d-flex align-items-center justify-content-between'>
          <div className='ml-3'>
            {value}
          </div>
          <div className='mr-2 mt-1'>
            <FontAwesomeIcon icon={faChevronDown} />
          </div>
        </Input>
      </div>
      {dropdownOpen && <Wrapper className='w-100'>
        <DropdownDiv className='w-100'>
          {menu && <div>
            {menu.map((menuOption, index) => (
              <MenuItem
                className='d-flex align-items-center'
                onClick={() => onSelectItem(index)} key={index}>
                <div className='ml-3'>
                  {menuOption}
                </div>
              </MenuItem>))}
          </div>}
        </DropdownDiv>
      </Wrapper>}
    </DropdownButton>
  </div>
  )
}

export default DropdownInput

