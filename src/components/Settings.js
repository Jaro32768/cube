import React, { useState } from 'react';
import '../css/Settings.css';

export default function Settings(props) {
    const [f2l, setF2l] = useState('lbl');
    const [ll, setLl] = useState('beginner');

    const f2lChange = (e) => {
        setF2l(e.target.value);
    };

    const llChange = (e) => {
        setLl(e.target.value);
    };

    const renderF2l = () => {
        switch (f2l) {
            case 'lbl':
                return (
                    <>
                        <div>lbl</div>
                    </>
                );
            case 'bf2l':
                return (
                    <>
                        <div>bf2l</div>
                    </>
                );
            case 'f2l':
                return (
                    <>
                        <div>f2l</div>
                    </>
                );
            default:
                return null;
        }
    };

    const renderLl = () => {
        switch (ll) {
            case 'beginner':
                return (
                    <>
                        <div>beginner</div>
                    </>
                );
            case 'bollpll':
                return (
                    <>
                        <div>bollpll</div>
                    </>
                );
            case 'ollpll':
                return (
                    <>
                        <div>ollpll</div>
                    </>
                );
            default:
                return null;
        }
    };

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
            <select name='f2l' onChange={f2lChange}>
                <option value='lbl'>Layer by layer</option>
                <option value='bf2l'>Beginner F2L</option>
                <option value='f2l'>F2L</option>
            </select>
            {renderF2l()}
            <h2>Last layer</h2>
            <select name='ll' onChange={llChange}>
                <option value='beginner'>Beginner method</option>
                <option value='bollpll'>Beginner OLL and PLL</option>
                <option value='ollpll'>OLL and PLL</option>
            </select>
            {renderLl()}
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
