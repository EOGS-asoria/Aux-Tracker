                                import { get_site_service } from "@/app/services/site-services";
                                import { setSites } from "./site-slice"; // Import the action directly

                                export function get_site_thunk() {
                                    return async function (dispatch) {
                                        try {
                                            const res = await get_site_service();
                                            dispatch(setSites(res)); // Dispatch the action directly
                                        } catch (error) {
                                            console.error("Failed to fetch sites:", error);
                                        }
                                    };
                                }
