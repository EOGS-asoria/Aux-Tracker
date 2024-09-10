            import Button from "@/app/_components/button";
            import React, { useState } from "react";
            import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
            import { CheckIcon } from "@heroicons/react/24/outline";

            export default function TimerButtonComponent({
                onClick,
                children, 
                type,
                ...props
            }) {
                const [open, setOpen] = useState(false);

                function onClickHandler() {
                    setOpen(true); // Open modal before performing action
                }

                function handleConfirm() {
                    setOpen(false);
                    onClick(); // Perform the action only after confirmation
                }

                return (
                    <div>
                        <Button
                            onClick={onClickHandler}
                            className="px-6 py-2 rounded-md w-36 flex items-center justify-center text-white transition duration-300 ease-in-out shadow"
                            type={type}
                            {...props}
                        >
                            {children}
                        </Button>
                        <Dialog
                            open={open}
                            onClose={() => setOpen(false)}
                            className="relative z-10"
                        >
                            <DialogBackdrop
                                transition
                                className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                            />
                            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                    <DialogPanel
                                        transition
                                        className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6"
                                    >
                                        <div>
                                            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                                                <CheckIcon
                                                    aria-hidden="true"
                                                    className="h-6 w-6 text-green-600"
                                                />
                                            </div>
                                            <div className="mt-3 text-center sm:mt-5">
                                                <DialogTitle
                                                    as="h3"
                                                    className="text-base font-semibold leading-6 text-gray-900"
                                                >
                                                    Are you sure you want to {children}?
                                                </DialogTitle>
                                            </div>
                                        </div>
                                        <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                                            <button
                                                type="button"
                                                onClick={handleConfirm}
                                                className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:col-start-2"
                                            >
                                                Confirm {children}
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setOpen(false)}
                                                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </DialogPanel>
                                </div>
                            </div>
                        </Dialog>
                    </div>
                );
            }
