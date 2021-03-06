import React from 'react'

import Form from 'gatsby-theme-dromedar/src/utils/form'
import SuccessIcon from '../../assets/success.svg'
import Spinner from "../../assets/spinner.svg"

export default ({ text }) => {
    return <div className="relative mt-8 mb-10 p-4 sm:p-8 rounded-lg bg-gray-700">
        <div className="dd-form-bg"></div>
        <Form url="subscribe">
            {(register, state) => <div className="relative">
                {1 === state.response.code ?
                    <div className="text-gray-200 flex items-center">
                        <SuccessIcon className="dd-success-icon mr-4 sm:mr-8 h-16 w-16" />
                        <p class="mt-0">{state.response.text}</p>
                    </div>
                    :
                    <div>
                        <p className="mb-4 text-gray-400">{text}</p>
                        <div className="rounded-lg overflow-hidden flex flex-col sm:flex-row">
                            <input
                                className="flex-1 py-3 px-5 bg-gray-300 text-gray-800"
                                placeholder="xyz@gmail.com" required
                                name="email" type="email" ref={register}
                            />

                            {state.loading ?
                                <div
                                    className="py-3 px-5 bg-purple-400 hover:opacity-75 text-purple-900 uppercase text-sm tracking-wider font-bold dd-center"
                                >
                                    <Spinner />
                                </div>
                                :
                                <button
                                    className="py-3 px-5 bg-purple-400 hover:opacity-75 text-purple-900 uppercase text-sm tracking-wider font-bold"
                                    type="submit">Érdekel</button>
                            }
                        </div>
                    </div>
                }
            </div>}
        </Form>
    </div>
}
