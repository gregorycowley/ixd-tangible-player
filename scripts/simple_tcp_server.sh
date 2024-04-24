#!/bin/bash

# For MacOS: brew install socat
# Define the port to listen on
PORT=4948
# Define the file name to log the messages
LOGFILE="received_messages.log"

# Start socat to listen on the specified TCP port and append received data to the log file
# socat -u TCP-LISTEN:$PORT,reuseaddr,fork OPEN:$LOGFILE,creat,append
# socat -u TCP-LISTEN:$PORT,reuseaddr,fork SYSTEM:"xxd -p -c256 | tee -a $LOGFILE"
socat -u TCP-LISTEN:$PORT,reuseaddr,fork SYSTEM:"cat >> $LOGFILE"

# socat -u TCP-LISTEN:$PORT,reuseaddr,fork SYSTEM:'bash -c "read LINE; if [ \"$LINE\" != \"\$(tail -1 $LOGFILE)\" ]; then echo $LINE >> $LOGFILE; fi"'


# LOGFILE="$(pwd)/messages.log"
# echo $LOGFILE

# # Define the response function that socat will execute for each connection
# handle_connection() {
#     # local LOGFILE=$1
#     # Greeting message
#     # local greeting="Hello from the server! Type something and press enter."
#     # echo "$greeting" >> "$LOGFILE"
#     # echo "Outgoing: $greeting" >> "$LOGFILE"

#     local LOGFILE="/Users/gregorycowley/Projects/cca-apps/ixd-tangible-player/scripts/messages.log"
#     local MESSAGE="start"

#     # Reading from stdin (provided by socat)
#     while read line
#     do
#         if [[ -z "$line" ]]; then
#             MESSSAGE=0
#             break
#         fi
#         MESSSAGE="$line"
#     done
#     echo $MESSAGE >> "$LOGFILE"
# }
# export -f handle_connection

# echo "Starting TCP server on port $PORT..."
# # Use socat to listen on TCP port and for each connection, run the handle_connection function
# socat TCP-LISTEN:$PORT,reuseaddr,fork,debug SYSTEM:'bash -c handle_connection $LOGFILE' 
# # to send messages: echo -e "YourSerialDataHere\n\x1A" | socat - TCP4:127.0.0.1:494








# # Function to handle incoming requests
# handle_connection() {
#     echo "Received connection from $1"
#     while IFS= read -r line
#     do
#         echo "Received: $line"
#         if [[ -z "$line" ]]; then
#             break
#         fi
#     done

#     # Send a response
#     echo "Hello from server! Here's what you sent: $line"
# }

# # Setup a TCP listener on the specified port
# echo "Starting TCP server on port $PORT..."
# nc -lk -p $PORT -c "handle_connection"



## --------------------------------------



# echo "Starting TCP server on port $PORT..."
# # Listen on TCP port $PORT. Using redirection to handle input/output.
# nc -lk $PORT | while read line
# do
#     echo "Received: $line"
#     if [[ -z "$line" ]]; then
#         echo "No more input received. Closing connection."
#         break
#     fi
#     # Sending a response back to the client
#     echo "Hello from server! You said: $line" | nc -N localhost $PORT
# done



## --------------------------------------

# Define the response function that socat will execute for each connection
# handle_connection() {
#     # Reading from stdin (provided by socat)
#     while read line
#     do
#         echo "Server received: $line"  # Output to the terminal for logging
#         if [[ -z "$line" ]]; then
#             echo "Connection closed by client."
#             break
#         fi
#         # Send back the received line along with a custom message
#         echo "Server: You sent -> $line"
#     done
# }

# export -f handle_connection

# echo "Starting TCP server on port $PORT..."
# # Use socat to listen on TCP port and for each connection, run the handle_connection function
# socat TCP-LISTEN:$PORT,reuseaddr,fork SYSTEM:'bash -c handle_connection'



## ---------------------------------------







## -------------------------------------

# echo "Starting TCP server on port $PORT..."
# echo "Waiting for incoming messages..."

# Use socat to listen on TCP port, printing any received data to the terminal
# socat TCP-LISTEN:$PORT,reuseaddr,fork SYSTEM:'cat && echo Received new message'
# socat TCP-LISTEN:$PORT,reuseaddr SYSTEM:'cat && echo Received new message'


