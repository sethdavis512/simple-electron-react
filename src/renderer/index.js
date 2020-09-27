const { ipcRenderer } = require('electron')

import React, { useState } from 'react'
import { render } from 'react-dom'

import Button from './components/Button'
import FormField from './components/FormField'
import TextInput from './components/TextInput'

import './styles/App.scss'

const App = () => {
    const [inputFilePath, setInputFilePath] = useState('')
    const [outputFilePath, setOutputFilePath] = useState('')

    const createHandlePathChange = (setFn) => (event) => {
        setFn(event.currentTarget.value)
    }

    const createHandleDialogOpen = (setFn, isFile = false) => async () => {
        const filePath = await ipcRenderer.invoke('open-file', isFile)
        setFn(filePath)
    }

    return (
        <section className="app section">
            <h1 className="title is-1">
                Simple Electron & React
            </h1>
            <form>
                <div className="columns">
                    <div className="column">
                        <FormField label="Input File Path">
                            <TextInput
                                handleChange={createHandlePathChange(setInputFilePath)}
                                value={inputFilePath}
                            />
                        </FormField>
                        <FormField>
                            <Button
                                text="Set Input Path"
                                handleClick={createHandleDialogOpen(
                                    setInputFilePath
                                )}
                            />
                        </FormField>
                    </div>
                    <div className="column">
                        <FormField label="Output File Path">
                            <TextInput
                                handleChange={createHandlePathChange(setOutputFilePath)}
                                value={outputFilePath}
                            />
                        </FormField>
                        <FormField>
                            <Button
                                text="Set Output Path"
                                handleClick={createHandleDialogOpen(
                                    setOutputFilePath
                                )}
                            />
                        </FormField>
                    </div>
                </div>
            </form>
        </section>
    )
}

render(<App />, document.getElementById('app'))
