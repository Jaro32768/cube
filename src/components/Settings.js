import React, { useState } from 'react';
import '../css/Settings.css';
import firebase from 'firebase/compat/app';

export default function Settings(props) {
    const [language, setLanguage] = useState(props.language);
    const [method, setMethod] = useState('beginner');
    const [f2l, setF2l] = useState('lbl');
    const [ll, setLl] = useState('beginner');

    const languageChange = (e) => {
        setLanguage(e.target.value);
    };
    const presetChange = (e) => {
        switch (e.target.value) {
            case 'beginner':
                setMethod('beginner');
                setF2l('lbl');
                setLl('beginner');
                break;
            case 'bcfop':
                setMethod('bcfop');
                setF2l('bf2l');
                setLl('bollpll');
                break;
            case 'cfop':
                setMethod('cfop');
                setF2l('f2l');
                setLl('ollpll');
                break;
            case 'custom':
                setMethod('custom');
                break;
            default:
                break;
        }
    };

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
                        <div>{props.language === 'english' ? 'beginner' : 'začiatočnícka'}</div>
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
            <h1>{props.language === 'english' ? 'Settings' : 'Nastavenia'}</h1>
            <h2>{props.language === 'english' ? 'Languages' : 'Jazyky'}</h2>
            <select name='language' onChange={languageChange}>
                {props.language === 'english' ? (
                    <>
                        <option value='english'>English</option>
                        <option value='slovak'>Slovak</option>
                    </>
                ) : (
                    <>
                        <option value='slovak'>Slovenský</option>
                        <option value='english'>Anglický</option>
                    </>
                )}
            </select>
            <h2>{props.language === 'english' ? 'Presets' : 'Prednastavenia'}</h2>
            <select name='preset' onChange={presetChange}>
                <option value='beginner'>{props.language === 'english' ? 'Beginner method' : 'Začiatočnícka metóda'}</option>
                <option value='bcfop'>{props.language === 'english' ? 'Beginner CFOP' : 'Začiatočnícke CFOP'}</option>
                <option value='cfop'>CFOP</option>
                <option value='custom'>{props.language === 'english' ? 'Custom' : 'Vlastné'}</option>
            </select>
            <h2>{props.language === 'english' ? 'First two layers' : 'Prvé dve vrstvy'}</h2>
            {method === 'custom' && (
                <select name='f2l' onChange={f2lChange}>
                    <option value='lbl'>{props.language === 'english' ? 'Layer by layer' : 'Po vrstvách'}</option>
                    <option value='bf2l'>{props.language === 'english' ? 'Beginner F2L' : 'Začiatočnícke F2L'}</option>
                    <option value='f2l'>F2L</option>
                </select>
            )}
            {renderF2l()}
            <h2>{props.language === 'english' ? 'Last layer' : 'Posledná vrstva'}</h2>
            {method === 'custom' && (
                <select name='ll' onChange={llChange}>
                    <option value='beginner'>{props.language === 'english' ? 'Beginner method' : 'Začiatočnícka metóda'}</option>
                    <option value='bollpll'>{props.language === 'english' ? 'Beginner OLL and PLL' : 'Začiatočnícke OLL a PLL'}</option>
                    <option value='ollpll'>{props.language === 'english' ? 'OLL and PLL' : 'OLL a PLL'}</option>
                </select>
            )}
            {renderLl()}
            {firebase.auth().currentUser == null ? (
                <h1>
                    <strong>
                        {props.language === 'english'
                            ? "Keep in mind that as a guest you won't be able to restore your settings on your future site visit."
                            : 'Pamätaj, že ako hosť nebudeš mať obnovené tvoje nastavenia pri ďalšej návšteve'}
                    </strong>
                </h1>
            ) : null}
            <button className='close-btn' onClick={() => props.setAreSettingsVisible(false)}>
                {props.language === 'english' ? 'Back' : 'Späť'}
            </button>
            <button
                className='save-btn'
                onClick={() => {
                    props.setLanguage(language);
                    props.setAreSettingsVisible(false);
                }}
            >
                {props.language === 'english' ? 'Save' : 'Uložiť'}
            </button>
        </>
    );
}
