import React from 'react';
import '../css/Settings.css';

export default function Settings(props) {
    return (
        <>
            <h1>Settings</h1>
            <h3>lorem</h3>
            <select name='lorem' id='lorem'>
                <option value='lorem'>lorem</option>
                <option value='lorem'>lorem</option>
                <option value='lorem'>lorem</option>
                <option value='lorem'>lorem</option>
            </select>
            <h3>lorem</h3>
            <select name='lorem' id='lorem'>
                <option value='lorem'>lorem</option>
            </select>
            <h3>lorem</h3>
            <select name='lorem' id='lorem'>
                <option value='lorem'>lorem</option>
            </select>
            <h3>lorem</h3>
            <select name='lorem' id='lorem'>
                <option value='lorem'>lorem</option>
            </select>
            <h3>lorem</h3>
            <select name='lorem' id='lorem'>
                <option value='lorem'>lorem</option>
            </select>
            <button className='close-bttn' onClick={() => props.setAreSettingsVisible(false)}>
                Back
            </button>
            <button className='save-btn' onClick={() => {}}>
                Save
            </button>
        </>
    );
}
