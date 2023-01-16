import React from 'react';
import '../css/Settings.css';

export default function Settings(props) {
    return (
        <>
            <h1>Settings</h1>
            <h2>Presets</h2>
            <select name='method'>
                <option value='beginner'>Beginner method</option>
                <option value='bcfop'>Beginner CFOP</option>
                <option value='cfop'>CFOP</option>
                <option value='custom'>Custom</option>
            </select>
            <h2>First two layers</h2>
            <select name='f2l'>
                <option value='layer by layer'>Layer by layer</option>
                <option value='bf2l'>Beginner F2L</option>
                <option value='f2l'>F2L</option>
            </select>
            <h2>Last layer</h2>
            <select name='ll'>
                <option value='beginner'>Beginner method</option>
                <option value='ollpll'>OLL and PLL</option>
            </select>
            <p>Keep in mind that as a guest you won't be able to restore your settings on your future site visit.</p>
            <button className='close-btn' onClick={() => props.setAreSettingsVisible(false)}>
                Back
            </button>
            <button className='save-btn' onClick={() => {}}>
                Save
            </button>
        </>
    );
}
